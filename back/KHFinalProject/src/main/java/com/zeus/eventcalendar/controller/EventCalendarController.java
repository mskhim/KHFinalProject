package com.zeus.eventcalendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.eventcalendar.service.EventCalendarService;

@RestController
@RequestMapping(value = "/eventcalendar")
public class EventCalendarController {
	@Autowired
	private EventCalendarService service;

}
