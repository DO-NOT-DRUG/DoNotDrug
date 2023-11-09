package com.dnd.antidrug.tweet.service;

import com.dnd.antidrug.member.entity.Criminal;
import com.dnd.antidrug.member.service.CriminalService;
import com.dnd.antidrug.tweet.dto.request.TwitterRequest;
import com.dnd.antidrug.tweet.dto.response.TwitterResponse;
import com.dnd.antidrug.tweet.entity.Twitter;
import com.dnd.antidrug.tweet.repository.TwitterRepository;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class TwitterService {

    private final TwitterRepository twitterRepository;

    private final CriminalService criminalService;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public List<TwitterResponse> getKeywordTwitter(Long criminalId, TwitterRequest twitterRequest) {
        List<TwitterResponse> twitterResponseList = new ArrayList<>();
        List<Twitter> twitterList = twitterRepository.findAllByKeyword(twitterRequest.keyword());

        Criminal criminal = criminalService.findById(criminalId);

        for(int i=0;i< twitterList.size();i++) {
            TwitterResponse twitterResponse = new TwitterResponse(
                twitterList.get(i).getId(),
                twitterList.get(i).getCreatedAt(),
                twitterList.get(i).getUser(),
                twitterList.get(i).getTweet(),
                twitterList.get(i).getUrl()
            );
            twitterResponseList.add(twitterResponse);
            // 마약 사범이 본 게시물 추가
            log.info("{}",criminal.getName());
            criminal.getReadTweets().add(twitterList.get(i));
//            log.info("{}",criminal.getReadTweets().size());
        }
        entityManager.flush();
        // 경계도 증가 등 필요
        return twitterResponseList;
    }
}
