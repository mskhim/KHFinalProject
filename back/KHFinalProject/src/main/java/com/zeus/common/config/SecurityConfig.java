package com.zeus.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // CSRF 비활성화
            .cors().and() // CORS 활성화
            .authorizeHttpRequests()
            .requestMatchers("/admin/**").permitAll() // /admin/** 경로 허용
            .anyRequest().authenticated(); // 나머지 요청은 인증 필요
        return http.build();
    }
    
}
