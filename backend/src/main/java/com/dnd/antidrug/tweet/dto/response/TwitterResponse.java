package com.dnd.antidrug.tweet.dto.response;

import java.time.LocalDateTime;

public record TwitterResponse(
    Long tweetId,
    LocalDateTime createdAt,
    String user,
    String tweet,
    String url
) {

}
