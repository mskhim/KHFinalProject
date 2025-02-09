package com.zeus.common.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

@Configuration
@PropertySource("classpath:.env")  // 📌 .env를 Spring 환경 변수로 로드
public class EnvConfig {

    private final Environment env;

    @Autowired
    public EnvConfig(Environment env) {
        this.env = env;
    }

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure()
                     .directory("src/main/resources") // 📌 .env 파일이 위치한 경로
                     .ignoreIfMalformed()
                     .ignoreIfMissing()
                     .load();
    }

    // 환경 변수 값 가져오기
    public String getEnvValue(String key) {
        return env.getProperty(key, "");
    }
}
