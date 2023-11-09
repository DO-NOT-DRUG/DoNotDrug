package com.dnd.antidrug.member.dto.response;

import java.time.LocalDateTime;

public record CriminalResponse(
    LocalDateTime createdAt,
    Long criminalId,
    String email,
    String name,
    int riskPoint,
    boolean isProtected
) {

}
