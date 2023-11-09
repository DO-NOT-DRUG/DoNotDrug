package com.dnd.antidrug.member.service;

import com.dnd.antidrug.global.exception.ErrorCode;
import com.dnd.antidrug.member.dto.request.CriminalReadTweetRequest;
import com.dnd.antidrug.member.dto.request.RegisterCriminalRequest;
import com.dnd.antidrug.member.entity.Criminal;
import com.dnd.antidrug.member.entity.Probation;
import com.dnd.antidrug.member.exception.MemberException;
import com.dnd.antidrug.member.repository.CriminalRepository;
import com.dnd.antidrug.member.repository.ProbationRepository;
import com.dnd.antidrug.tweet.dto.response.TwitterResponse;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProbationService {

    private final ProbationRepository probationRepository;
    private final CriminalRepository criminalRepository;

    private final CriminalService criminalService;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Probation findByEmail(String email) {
        return probationRepository.findByEmail(email).orElseThrow(() -> new MemberException(
            ErrorCode.USER_NOT_FOUND));
    }

    @Transactional
    public Probation findById(Long id) {
        return probationRepository.findById(id).orElseThrow(() -> new MemberException(
            ErrorCode.USER_NOT_FOUND));
    }

    @Transactional
    public void registerCriminal(Long probationId, List<RegisterCriminalRequest> registerCriminalRequestList) {
        Probation probation = findById(probationId);

        for(int i=0;i<registerCriminalRequestList.size();i++) {
            Criminal criminal = criminalService.findById(registerCriminalRequestList.get(i).criminalId());
            criminal.updateStatus();
            criminal.updateProbation(probation);
            probation.getCriminals().add(criminal);
        }
    }

    @Transactional(readOnly = true)
    public List<TwitterResponse> getCriminalReadTweetList(CriminalReadTweetRequest criminalReadTweetRequest) {
        entityManager.clear();
        List<TwitterResponse> twitterResponseList = new ArrayList<>();
        Criminal criminal = criminalService.findById(criminalReadTweetRequest.criminalId());
        Probation probation = findById(criminalReadTweetRequest.probationId());
        log.info("{}",criminal.getReadTweets().size());
        log.info("{}",criminal.getName());
        for(int i=0;i<criminal.getReadTweets().size();i++) {
            TwitterResponse twitterResponse = new TwitterResponse(
                criminal.getReadTweets().get(i).getId(),
                criminal.getReadTweets().get(i).getCreatedAt(),
                criminal.getReadTweets().get(i).getUser(),
                criminal.getReadTweets().get(i).getTweet(),
                criminal.getReadTweets().get(i).getUrl()
            );
            twitterResponseList.add(twitterResponse);
        }
        return twitterResponseList;
    }
}
