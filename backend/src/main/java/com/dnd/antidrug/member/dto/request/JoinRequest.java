package com.dnd.antidrug.member.dto.request;

import com.dnd.antidrug.member.entity.Role;

public record JoinRequest(
    String email,
    String name,
    String loginPassword,
    Role role
) {

}
