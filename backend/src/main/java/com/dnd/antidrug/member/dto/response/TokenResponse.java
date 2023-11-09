package com.dnd.antidrug.member.dto.response;

import com.dnd.antidrug.member.entity.Role;

public record TokenResponse(
    Long id,
    String accessToken,
    String refreshToken,
    Role role
) {

}
