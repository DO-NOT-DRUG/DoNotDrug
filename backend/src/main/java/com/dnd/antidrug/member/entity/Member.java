package com.dnd.antidrug.member.entity;

import com.dnd.antidrug.member.dto.request.JoinRequest;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Getter
@Entity
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String loginPassword;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public static Member from(JoinRequest joinRequest) {
        return Member.builder()
            .email(joinRequest.email())
            .loginPassword(joinRequest.loginPassword())
            .role(joinRequest.role())
            .name(joinRequest.name())
            .build();
    }

    public void encodePassword(String encodedPassword) {
        this.loginPassword = encodedPassword;
    }
}
