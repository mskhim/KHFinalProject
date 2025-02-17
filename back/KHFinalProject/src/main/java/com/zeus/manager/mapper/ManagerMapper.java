package com.zeus.manager.mapper;

import java.util.List;
import java.util.Map;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;
import com.zeus.user.domain.User;

public interface ManagerMapper {
	boolean insertEventByManager(EventDTO eventDTO);
	boolean insertEventImgByManagerThumb(EventImg eventImg);
	boolean insertEventImgByManagerSub(EventImg eventImg);
	List<Map<String, Object>> getManagerEventStatistics(User user);
	
}
