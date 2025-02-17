package com.zeus.manager.service;

import java.util.List;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;
import com.zeus.manager.domain.ManagerStats;
import com.zeus.user.domain.User;

public interface ManagerService {

	EventDTO insertEventByManager(EventDTO eventDTO);
	Event insertEventImgByManagerThumb(EventImg eventImg);
	Event insertEventImgByManagerSub(EventImg eventImg);
	List<ManagerStats> selectEventStatsData(User user);
	
}
