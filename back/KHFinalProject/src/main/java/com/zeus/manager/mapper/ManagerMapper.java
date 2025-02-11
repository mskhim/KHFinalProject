package com.zeus.manager.mapper;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventImg;

public interface ManagerMapper {
	boolean insertEventByManager(Event event);
	boolean insertEventImgByManagerThumb(EventImg eventImg);
	boolean insertEventImgByManagerSub(EventImg eventImg);
	
}
