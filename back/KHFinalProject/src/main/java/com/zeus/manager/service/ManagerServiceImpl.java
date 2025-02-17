package com.zeus.manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.manager.mapper.ManagerMapper;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class ManagerServiceImpl implements ManagerService {
	@Autowired
	private ManagerMapper mapper;

	@Override
	public EventDTO insertEventByManager(EventDTO eventDTO) {
		// TODO Auto-generated method stub
		mapper.insertEventByManager(eventDTO);
		return eventDTO;
	}

	@Override
	public Event insertEventImgByManagerThumb(EventImg eventImg) {
		log.info(eventImg+"");
		mapper.insertEventImgByManagerThumb(eventImg);
		return null;
	}
	@Override
	public Event insertEventImgByManagerSub(EventImg eventImg) {
		log.info(eventImg+"");
		mapper.insertEventImgByManagerSub(eventImg);
		return null;
	}

	@Override
	public List<PublicDataEventDTO> selectEventStatsData(User user) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
