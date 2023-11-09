package com.dnd.antidrug.member.repository;

import com.dnd.antidrug.member.entity.Member;
import com.dnd.antidrug.member.entity.Probation;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProbationRepository extends JpaRepository<Probation, Long> {

    Optional<Probation> findByEmail(String email);
}
