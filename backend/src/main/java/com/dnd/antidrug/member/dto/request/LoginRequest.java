package com.dnd.antidrug.member.dto.request;

import javax.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank String email,
    @NotBlank String loginPassword
) {

}
