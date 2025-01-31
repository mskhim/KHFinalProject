package com.zeus.common.config;

import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.zeus.user.domain.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    @Value("${jwt.secret}") // application.properties에서 비밀키 읽기
    private String secretKey;

    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60; // 60분 (1시간)
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

    // ================== JWT 관련 ==================

    /** ✅ JWT 액세스 토큰 생성 */
    public String createAccessToken(User user) {
        String birthDate = (user.getBirth() != null) 
            ? user.getBirth().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) 
            : "N/A"; // null일 경우 기본값 설정

        return Jwts.builder()
                .setSubject("userRegister")
                .claim("id", user.getId())
                .claim("role", "ROLE_" + user.getRole())
                .claim("provider", user.getProvider())
                .claim("phone", user.getPhone())
                .claim("gender", String.valueOf(user.getGender()))
                .claim("birth", birthDate) // 수정된 부분
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))    
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /** ✅ 리프레시 토큰 생성 */
    public String createRefreshToken(User user) {
        return Jwts.builder()
                .setSubject("refreshToken")
                .claim("id", user.getId()) // 리프레시 토큰에도 사용자 ID 포함
                .claim("provider", user.getProvider())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))    
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /** ✅ JWT 검증 및 Claims 반환 */
    public Claims validateToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    /** ✅ JWT에서 Role 추출 */
    public String getRoleFromToken(String token) {
        return validateToken(token).get("role", String.class);
    }

    /** ✅ JWT 만료 여부 확인 */
    public boolean isTokenExpired(String token) {
        Claims claims = validateToken(token);
        return claims.getExpiration().before(new Date()); // 만료 시간이 현재보다 이전이면 true 반환
    }
    
    /** ✅ JWT에서 id,provider 추출해서 User에 담아서 반환 */
    public User getIdProviderFromToken(String token) {
    	User user= new User();
    	user.setId(validateToken(token).get("id", String.class));
    	user.setProvider(validateToken(token).get("provider", String.class));
        return user;
    }
}
