package com.zeus;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.zeus.admin.mapper",
		"com.zeus.event.mapper",
		"com.zeus.eventcalendar.mapper",
		"com.zeus.eventmap.mapper",
		"com.zeus.main.mapper",
		"com.zeus.manager.mapper",
		"com.zeus.notice.mapper",
		"com.zeus.qna.mapper",
		"com.zeus.user.mapper",
})
public class KhFinalProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(KhFinalProjectApplication.class, args);
	}

}
