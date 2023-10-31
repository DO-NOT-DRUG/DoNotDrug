package com.dnd.antidrug.global.dto.response;

import com.dnd.antidrug.global.exception.ErrorCode;

public record ErrorResponse(
    String code,
    ErrorCode errorCode,
    String message
) {

}
