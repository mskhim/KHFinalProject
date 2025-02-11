package com.zeus.event.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.domain.PublicDataEvent;
import com.zeus.event.mapper.EventMapper;
import com.zeus.user.domain.User;

@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventMapper mapper;

	@Override
	public List<PublicDataEvent> selectPublicDataEvent(User user) {
		return mapper.selectPublicDataEvent(user);
	}


}
