package com.zeus.manager.service;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;

public interface ManagerService {

	EventDTO insertEventByManager(EventDTO eventDTO);
	Event insertEventImgByManagerThumb(EventImg eventImg);
	Event insertEventImgByManagerSub(EventImg eventImg);
	
}
