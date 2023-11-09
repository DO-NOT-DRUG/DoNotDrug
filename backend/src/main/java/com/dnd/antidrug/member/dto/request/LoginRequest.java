package com.dnd.antidrug.member.dto.request;

import com.dnd.antidrug.member.entity.Role;
import javax.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank String email,
    @NotBlank String loginPassword,
    Role role
    ) {

}
