package com.dnd.antidrug.tweet.repository;

import com.dnd.antidrug.tweet.entity.Twitter;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TwitterRepository extends JpaRepository<Twitter, Long> {

    @Query("SELECT t FROM Twitter t WHERE t.tweet LIKE CONCAT('%', :keyword, '%')")
    List<Twitter> findAllByKeyword(@Param("keyword") String keyword);

}
