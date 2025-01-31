package com.zeus.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // ✅ CSRF 비활성화 (JWT 사용 시 필요)
            .cors(cors -> cors.configure(http)) // ✅ CORS 설정 활성화
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ✅ 세션 사용 안함 (JWT 기반 인증)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // ✅ OPTIONS 요청 허용 (CORS preflight 요청 처리)
                .requestMatchers("/auth/jwtAdmin").hasAuthority("ROLE_0") // ✅ ROLE_0만 접근 가능
                .requestMatchers("/auth/jwtManager").hasAnyAuthority("ROLE_0", "ROLE_1") // ✅ ROLE_0, ROLE_1 접근 가능
                .requestMatchers("/auth/jwtUser").hasAnyAuthority("ROLE_0", "ROLE_1", "ROLE_2") // ✅ ROLE_0, ROLE_1, ROLE_2 접근 가능
                .anyRequest().permitAll() // ✅ 그 외 모든 요청 허용
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // ✅ JWT 인증 필터 추가

        return http.build();
    }
}
