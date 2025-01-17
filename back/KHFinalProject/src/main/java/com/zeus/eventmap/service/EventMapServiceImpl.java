package com.zeus.eventmap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.eventmap.mapper.EventMapMapper;
@Service
public class EventMapServiceImpl implements EventMapService {
	@Autowired
	private EventMapMapper mapper;
}
