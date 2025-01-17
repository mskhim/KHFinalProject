package com.zeus.common.config;

import org.mybatis.spring.annotation.MapperScan;

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
public class CommonConfig {

}
