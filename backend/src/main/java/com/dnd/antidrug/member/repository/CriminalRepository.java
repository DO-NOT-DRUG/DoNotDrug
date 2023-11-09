package com.dnd.antidrug.member.repository;

import com.dnd.antidrug.member.entity.Criminal;
import com.dnd.antidrug.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CriminalRepository extends JpaRepository<Criminal, Long> {

    Optional<Criminal> findByEmail(String email);

    @Query("SELECT c FROM Criminal c WHERE c.isProtected = false")
    List<Criminal> findCriminalsByIsProtected();
}