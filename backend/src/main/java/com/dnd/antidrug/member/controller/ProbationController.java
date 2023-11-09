package com.dnd.antidrug.member.controller;

import com.dnd.antidrug.member.dto.request.CriminalReadTweetRequest;
import com.dnd.antidrug.member.dto.request.RegisterCriminalRequest;
import com.dnd.antidrug.member.dto.response.CriminalResponse;
import com.dnd.antidrug.member.service.CriminalService;
import com.dnd.antidrug.member.service.ProbationService;
import com.dnd.antidrug.tweet.dto.response.TwitterResponse;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/probation")
public class ProbationController {

    private final CriminalService criminalService;
    private final ProbationService probationService;

    // 등록을 위하 마약 사범 전체 조회
    @GetMapping("/list")
    @ApiOperation(value="마약 사범 조회", notes="등록을 위하 마약 사범 전체 조회")
    public ResponseEntity<List<CriminalResponse>> getAllCriminalList() {
        List<CriminalResponse> criminalResponseList = criminalService.getAllCirminalList();
        return ResponseEntity.ok().body(criminalResponseList);
    }

    // 미약사범 등록
    @PostMapping("/register/criminal/{probationId}")
    @ApiOperation(value="마약 사범 등록", notes="미약사범 등록")
    public ResponseEntity<Void> registerCriminal(@RequestBody RegisterCriminalRequest registerCriminalRequest, @PathVariable Long probationId) {

        probationService.registerCriminal(probationId, registerCriminalRequest);
        return ResponseEntity.noContent().build();
    }

    // 게시물 조회
    @PostMapping("/tweet/list")
    @ApiOperation(value="마약 사범이 읽은 게시글 조회", notes="마약 사범이 읽은 게시글 조회")
    public ResponseEntity<List<TwitterResponse>> getCriminalReadTweet(@RequestBody CriminalReadTweetRequest criminalReadTweetRequest) {
        List<TwitterResponse> twitterResponseList = probationService.getCriminalReadTweetList(criminalReadTweetRequest);

        return ResponseEntity.ok().body(twitterResponseList);
    }

}
