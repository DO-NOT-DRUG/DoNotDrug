package com.dnd.antidrug.member.exception;

import com.dnd.antidrug.global.exception.BaseException;
import com.dnd.antidrug.global.exception.ErrorCode;

public class EmailException extends BaseException {

    public EmailException(ErrorCode errorCode) {
        super(errorCode);
    }
}
