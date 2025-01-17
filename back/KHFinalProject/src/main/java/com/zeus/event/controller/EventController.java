package com.zeus.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.event.service.EventService;

@RestController
@RequestMapping(value = "/event")
public class EventController {
	@Autowired
	private EventService service;
}
