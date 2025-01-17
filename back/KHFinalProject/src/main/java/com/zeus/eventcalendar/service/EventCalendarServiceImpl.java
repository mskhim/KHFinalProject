package com.zeus.eventcalendar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.eventcalendar.mapper.EventCalendarMapper;

@Service
public class EventCalendarServiceImpl implements EventCalendarService {
	@Autowired
	private EventCalendarMapper mapper;
}
