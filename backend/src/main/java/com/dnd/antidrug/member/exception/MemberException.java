package com.dnd.antidrug.member.exception;

import com.dnd.antidrug.global.exception.BaseException;
import com.dnd.antidrug.global.exception.ErrorCode;

public class MemberException extends BaseException {

    public MemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
