package com.dnd.antidrug.global.util;

import com.dnd.antidrug.member.entity.Criminal;
import com.dnd.antidrug.member.entity.Probation;
import com.dnd.antidrug.member.entity.Role;
import com.dnd.antidrug.member.repository.CriminalRepository;
import com.dnd.antidrug.member.repository.ProbationRepository;
import com.dnd.antidrug.member.service.CriminalService;
import com.dnd.antidrug.member.service.ProbationService;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProbationRepository probationRepository;
    private final CriminalRepository criminalRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final ProbationService probationService;
    private final CriminalService criminalService;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//
//        // 관리자 생성 5명
//        for(int i=1;i<6;i++) {
//            Probation probation = Probation.builder()
//                .email("admin" + i)
//                .name("보호관찰관"+i)
//                .role(Role.GENERAL)
//                .criminals(new ArrayList<>())
//                .build();
//            probation.encodePassword(passwordEncoder.encode("1234"));
//            probationRepository.save(probation);
//            for(int j=1;j<=5;j++) {
//                Criminal criminal = Criminal.builder()
//                                            .email("test"+ +( (5*(i-1) +j) ))
//                                            .name("마약사범" +( (5*(i-1) +j) ))
//                                            .role(Role.CRIMINAL)
//                                            .riskPoint(0)
//                                            .isProtected(true)
//                    .probation(probation)
//                                            .build();
//                criminal.encodePassword(passwordEncoder.encode("1234"));
//                criminalRepository.save(criminal);
//                probation.getCriminals().add(criminal);
//            }
//        }
//
//        // 관리 연결 전이 마약 사번 20명
//        for(int i=26;i<46;i++){
//            Criminal criminal = Criminal.builder()
//                                        .email("test"+i)
//                                        .name("마약사범"+ i)
//                                        .role(Role.CRIMINAL)
//                                        .riskPoint(0)
//                                        .isProtected(false)
//                                        .build();
//            criminal.encodePassword(passwordEncoder.encode("1234"));
//            criminalRepository.save(criminal);
//        }
    }
}
