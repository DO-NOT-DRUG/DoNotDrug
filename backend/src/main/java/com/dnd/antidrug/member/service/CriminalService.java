package com.dnd.antidrug.member.service;

import com.dnd.antidrug.global.exception.ErrorCode;
import com.dnd.antidrug.member.dto.response.CriminalResponse;
import com.dnd.antidrug.member.entity.Criminal;
import com.dnd.antidrug.member.exception.MemberException;
import com.dnd.antidrug.member.repository.CriminalRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CriminalService {

    private final CriminalRepository criminalRepository;

    public Criminal findByEmail(String email) {
        return criminalRepository.findByEmail(email).orElseThrow(() -> new MemberException(
            ErrorCode.USER_NOT_FOUND));
    }
    public Criminal findById(Long id) {
        return criminalRepository.findById(id).orElseThrow(() -> new MemberException(
            ErrorCode.USER_NOT_FOUND));
    }

    // 범죄자 반환
    @Transactional
    public List<CriminalResponse> getAllCirminalList() {
        List<Criminal> criminalList = criminalRepository.findCriminalsByIsProtected();
        List<CriminalResponse> criminalResponseList = new ArrayList<>();
        for(int i=0;i<criminalList.size();i++) {
            CriminalResponse criminalResponse = new CriminalResponse(
                criminalList.get(i).getCreatedAt(),
                criminalList.get(i).getId(),
                criminalList.get(i).getEmail(),
                criminalList.get(i).getName(),
                criminalList.get(i).getRiskPoint(),
                false
            );
            criminalResponseList.add(criminalResponse);
        }
        return criminalResponseList;
    }


}
