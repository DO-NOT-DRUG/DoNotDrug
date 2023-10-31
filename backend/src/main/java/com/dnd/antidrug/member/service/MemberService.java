package com.dnd.antidrug.member.service;

import com.dnd.antidrug.global.exception.ErrorCode;
import com.dnd.antidrug.member.dto.request.JoinRequest;
import com.dnd.antidrug.member.dto.request.LoginRequest;
import com.dnd.antidrug.member.dto.response.TokenResponse;
import com.dnd.antidrug.member.entity.Member;
import com.dnd.antidrug.member.exception.EmailException;
import com.dnd.antidrug.member.exception.MemberException;
import com.dnd.antidrug.member.repository.MemberRepository;
import com.dnd.antidrug.security.util.JwtProvider;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final Long emailExpireTimeMs =  1800000L;
    private final String EMAIL_PREFIX = "AuthCode";

    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.token.secret}")
    private String secretKey;

    public void sendCodeToEmail(String email) {
        checkDuplicatedEmail(email);
        String title = "또박또박 이메일 인증 번호";
        String authCode = createCode();

        // 메일 보내기
        emailService.sendEmail(email,title,authCode);

        // 이메일 인증 요청 시 인증 번호 Redis에 저장 후 비교
        redisTemplate.opsForValue().set(EMAIL_PREFIX + email, authCode, emailExpireTimeMs, TimeUnit.MILLISECONDS);
    }

    public void verifyEmail(String email, String authCode) {
        String redisAuthCode = redisTemplate.opsForValue().get(EMAIL_PREFIX+email);

        // 인증번호 비교
        if(redisAuthCode == null || !redisAuthCode.equals(authCode)) {
            throw new EmailException(ErrorCode.EMAIL_NOT_VALID);
        }

        // 인증 후 Redis에서 삭제
        redisTemplate.delete(EMAIL_PREFIX+email);
    }

    public void joinMember(JoinRequest joinRequest) {
        // 이메일 중복 검사
        this.checkDuplicatedEmail(joinRequest.email());

        // 이에일 인증 여부 검사 -> 캐시에 없으면 인증된것으로 간주

        Member member = Member.from(joinRequest);
        member.encodePassword(passwordEncoder.encode(member.getLoginPassword()));

        memberRepository.save(member);
    }

    public TokenResponse loginMember(LoginRequest loginRequest) {
        // 회원 검색
        Member member = findByEmail(loginRequest.email());

        // 비밀번호 확인
        if(!passwordEncoder.matches(loginRequest.loginPassword(), member.getLoginPassword())) {
            throw new MemberException(ErrorCode.INVALID_PASSWORD);
        }

        // 토큰 생성
        String accessToken = jwtProvider.createAccessToken(member.getId(), member.getEmail(), secretKey);
        String refreshToken = jwtProvider.createRefreshToken(member.getEmail(), secretKey);

        return new TokenResponse(member.getId(), accessToken, refreshToken);
    }

    private Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                               .orElseThrow(() -> new MemberException(ErrorCode.USER_NOT_FOUND));
    }



    private String createCode() {
        int length = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder sb = new StringBuilder();
            for(int i=0;i<length;i++) {
                sb.append(random.nextInt(10));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new EmailException(ErrorCode.NO_ALGORITHM);
        }
    }

    private void checkDuplicatedEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if(member.isPresent()) {
            log.info("Already exists email {}", email);
            throw new MemberException(ErrorCode.EMAIL_DUPLICATED);
        }
    }
}