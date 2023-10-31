package com.dnd.antidrug.member.controller;

import com.dnd.antidrug.member.dto.request.EmailVerificationRequest;
import com.dnd.antidrug.member.dto.request.EmailVerifyRequest;
import com.dnd.antidrug.member.dto.request.JoinRequest;
import com.dnd.antidrug.member.dto.request.LoginRequest;
import com.dnd.antidrug.member.dto.response.TokenResponse;
import com.dnd.antidrug.member.service.MemberService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    // 이메일 인증 요청
    @PostMapping("/email/verify-request")
    public ResponseEntity<Void> sendEmail(@RequestBody EmailVerifyRequest emailVerifyRequest) {
        log.info("Send Email to {}", emailVerifyRequest.email());

        memberService.sendCodeToEmail(emailVerifyRequest.email());

        return ResponseEntity.noContent().build();
    }

    // 이메일 인증 확인
    @GetMapping("/email/verify")
    public ResponseEntity<Void> verifyEmail(@RequestBody EmailVerificationRequest emailVerificationRequest) {
        log.info("verify email {} with authCode {}", emailVerificationRequest.email(), emailVerificationRequest.authCode());

        memberService.verifyEmail(emailVerificationRequest.email(),
            emailVerificationRequest.authCode());

        return ResponseEntity.noContent().build();
    }

    // 회원 가입
    @PostMapping("/join")
    public ResponseEntity<Void> joinMember(@RequestBody JoinRequest joinRequest) {
        log.info("{} request join", joinRequest.email());

        memberService.joinMember(joinRequest);

        return ResponseEntity.noContent().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> loginMember(@RequestBody @Valid LoginRequest loginRequest) {
        log.info("{} request Login", loginRequest.email());

        TokenResponse tokenResponse = memberService.loginMember(loginRequest);

        return ResponseEntity.ok().body(tokenResponse);
    }
}
