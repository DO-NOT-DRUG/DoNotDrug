package com.dnd.antidrug.tweet.controller;

import com.dnd.antidrug.tweet.dto.request.TwitterRequest;
import com.dnd.antidrug.tweet.dto.response.TwitterResponse;
import com.dnd.antidrug.tweet.service.TwitterService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweet")
public class TwitterController {

    private final TwitterService twitterService;

    // 게시글 검색
    @PostMapping("/list/{criminalId}")
    public ResponseEntity<List<TwitterResponse>> getTweetList(@PathVariable Long criminalId, @RequestBody
    TwitterRequest twitterRequest) {

        List<TwitterResponse> twitterResponseList = twitterService.getKeywordTwitter(criminalId, twitterRequest);
        return ResponseEntity.ok().body(twitterResponseList);
    }
}
