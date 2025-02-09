package com.zeus.common.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class EnvInitializer implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // ✅ .env 파일을 자동으로 찾도록 설정
        Dotenv dotenv = Dotenv.configure()
        		.directory("src/main/resources") // ✅ 현재 실행하는 프로젝트 루트 경로
                .ignoreIfMalformed()
                .ignoreIfMissing()
                .load();

        Map<String, Object> envMap = new HashMap<>();

        // ✅ .env 값을 Spring 환경 변수로 등록
        dotenv.entries().forEach(entry -> envMap.put(entry.getKey(), entry.getValue()));
        environment.getPropertySources().addFirst(new MapPropertySource("dotenv", envMap));

        System.out.println("✅ .env 로드 완료: " + envMap.size() + "개의 환경 변수 추가됨!");
    }
}
