package com.dnd.antidrug.member.entity;

import com.dnd.antidrug.tweet.entity.Twitter;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Criminal extends Member{

    @Column(nullable = false)
    private int riskPoint; // 위험도

    @OneToMany(mappedBy = "criminal")
    private List<Twitter> readTweets = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private Probation probation;

    @Column(nullable = false)
    private boolean isProtected;

    public void updateStatus() {
        this.isProtected = true;
    }

    public void updateProbation(Probation probation) {
        this.probation = probation;
    }
}
