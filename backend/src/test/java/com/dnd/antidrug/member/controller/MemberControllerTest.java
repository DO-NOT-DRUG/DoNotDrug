package com.dnd.antidrug.member.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.dnd.antidrug.member.dto.request.EmailVerificationRequest;
import com.dnd.antidrug.member.dto.request.EmailVerifyRequest;
import com.dnd.antidrug.member.dto.request.JoinRequest;
import com.dnd.antidrug.member.dto.request.LoginRequest;
import com.dnd.antidrug.member.dto.response.TokenResponse;
import com.dnd.antidrug.member.entity.Role;
import com.dnd.antidrug.util.ControllerTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

public class MemberControllerTest extends ControllerTest {

    private final String baseUrl = "/api/v1/member";

    @Test
    @DisplayName("이메일_인증번호_요청")
    void sendEmailTest() throws Exception {
        EmailVerifyRequest emailVerifyRequest = new EmailVerifyRequest("ddobak@naver.com");

        mockMvc
            .perform(
                post(baseUrl + "/email/verify-request")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(emailVerifyRequest))
            )
            .andExpect(status().isNoContent())
            .andDo(
                document("/member/email-verify-request",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("email").description("이메일")
                    ))
            );
    }

    @Test
    @DisplayName("이메일_인증번호_요청_확인")
    void verifyEmailTest() throws Exception {
        EmailVerificationRequest emailVerificationRequest = new EmailVerificationRequest("ddobak@naver.com", "123456");

        mockMvc
            .perform(
                get(baseUrl + "/email/verify")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(emailVerificationRequest))
            )
            .andExpect(status().isNoContent())
            .andDo(
                document("/member/email-verify",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("email").description("이메일"),
                        fieldWithPath("authCode").description("인증번호")
                    ))
            );
    }

    @Test
    @DisplayName("회원가입")
    void joinMemberTest() throws Exception {
        JoinRequest joinRequest = new JoinRequest("kyu12@naver.com","조태규","1234", Role.GENERAL);

        mockMvc
            .perform(
                post(baseUrl + "/join")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(joinRequest))
            )
            .andExpect(status().isNoContent())
            .andDo(
                document("/member/join",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("email").description("이메일"),
                        fieldWithPath("name").description("이름"),
                        fieldWithPath("loginPassword").description("비밀번호"),
                        fieldWithPath("role").description("사용자 구분(보호관찰관-GENERAL, 마약사범-CRIMINAL")
                    ))
            );
    }

    @Test
    @DisplayName("로그인")
    void loginMemberTest() throws Exception {
        LoginRequest loginRequest = new LoginRequest("jo@naver.com", "1234");

        TokenResponse tokenResponse = new TokenResponse(1L, "accessToken", "refreshToken");
        when(memberService.loginMember(any())).thenReturn(tokenResponse);

        mockMvc
            .perform(
                post(baseUrl + "/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(loginRequest))
            )
            .andExpect(status().isOk())
            .andDo(
                document("/member/login",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("email").description("이메일"),
                        fieldWithPath("loginPassword").description("비밀번호")
                    ),
                    responseFields(
                        fieldWithPath("id").description("회원 PK 값"),
                        fieldWithPath("accessToken").description("JWT Access Token"),
                        fieldWithPath("refreshToken").description("JWT Refresh Token")
                    ))
            );
    }
}
