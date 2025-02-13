package com.zeus.manager.mapper;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;

public interface ManagerMapper {
	boolean insertEventByManager(EventDTO eventDTO);
	boolean insertEventImgByManagerThumb(EventImg eventImg);
	boolean insertEventImgByManagerSub(EventImg eventImg);
	
}
