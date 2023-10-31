package com.dnd.antidrug.member.dto.response;

public record TokenResponse(
    Long id,
    String accessToken,
    String refreshToken
) {

}
