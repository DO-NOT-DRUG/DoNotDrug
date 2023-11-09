package com.dnd.antidrug.tweet.entity;

import com.dnd.antidrug.member.entity.Criminal;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Twitter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    private String user;

    private String nickname;

    @Column(columnDefinition="TEXT")
    private String tweet;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criminal_id")
    private Criminal criminal;

}
