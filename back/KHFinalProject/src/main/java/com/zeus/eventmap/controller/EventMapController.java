package com.zeus.eventmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.eventmap.service.EventMapService;

@RestController
@RequestMapping(value = "/eventmap")
public class EventMapController {
	@Autowired
	private EventMapService service;
}
