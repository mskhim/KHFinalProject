package com.zeus.event.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventSelectList;
import com.zeus.event.domain.PublicDataEvent;
import com.zeus.event.mapper.EventMapper;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventMapper mapper;

	@Override
	public List<PublicDataEvent> selectPublicDataEvent(User user) {
		return mapper.selectPublicDataEvent(user);
	}

	@Override
	public List<EventSelectList> selectEventList(int page) {
		log.info("서비스시작");
	 List<EventSelectList> list= mapper.selectEventList(page);
		log.info(list+"");
		return list;
	}

	
}
