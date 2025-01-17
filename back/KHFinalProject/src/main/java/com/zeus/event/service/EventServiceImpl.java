package com.zeus.event.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.mapper.EventMapper;

@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventMapper mapper;
}
