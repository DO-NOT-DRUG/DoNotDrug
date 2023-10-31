package com.dnd.antidrug.member.dto.request;

public record EmailVerificationRequest(String email, String authCode) {

}
