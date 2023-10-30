package com.dnd.antidrug.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(length = 40)
    private String nickName;
    private String email;
    private String token;
    public void updateToken(String token){
        this.token=token;
    }
    public void updateEmail(String email){
        this.email=email;
    }
    public void updateNickName(String nickName){
        this.nickName=nickName;
    }

}
