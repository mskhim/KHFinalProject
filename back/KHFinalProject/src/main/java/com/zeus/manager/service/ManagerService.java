package com.zeus.manager.service;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventImg;

public interface ManagerService {

	Event insertEventByManager(Event event);
	Event insertEventImgByManagerThumb(EventImg eventImg);
	Event insertEventImgByManagerSub(EventImg eventImg);
	
}
