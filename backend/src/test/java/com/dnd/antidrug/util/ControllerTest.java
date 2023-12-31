package com.dnd.antidrug.util;

import com.dnd.antidrug.member.controller.MemberController;
import com.dnd.antidrug.member.repository.CriminalRepository;
import com.dnd.antidrug.member.repository.ProbationRepository;
import com.dnd.antidrug.member.service.EmailService;
import com.dnd.antidrug.member.service.MemberService;
import com.dnd.antidrug.security.util.JwtProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@ActiveProfiles("test")
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest({
    MemberController.class
})
public class ControllerTest {

    // Util
    @Autowired
    protected MockMvc mockMvc;
    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean protected JwtProvider jwtProvider;

    @Value("${jwt.token.secret}")
    protected String secretKey;

    // Service
    @MockBean protected MemberService memberService;
    @MockBean protected EmailService emailService;

    // Repository
    @MockBean protected ProbationRepository probationRepository;
    @MockBean protected CriminalRepository criminalRepository;

    protected String createToken(String email, String secretKey) {

        final long accessTokenExpireTimeMs = 3600000L; // 1시간
        final long refreshTokenExpireTimeMs = 1209600000L; // 2주일

        Claims claims = Jwts.claims();
        claims.put("email", email);

        Date now = new Date();
        Date accessTokenExpiration = new Date(now.getTime() + accessTokenExpireTimeMs);

        return Jwts.builder()
                   .setClaims(claims)
                   .setIssuedAt(now)
                   .setExpiration(accessTokenExpiration)
                   .signWith(
                       Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),
                       SignatureAlgorithm.HS256)
                   .compact();

    }
}
