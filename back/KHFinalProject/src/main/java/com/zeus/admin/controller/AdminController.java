package com.zeus.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.admin.service.AdminService;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {

	@Autowired
	private AdminService service;
	
	 @GetMapping("/test")
	    public Map<String, String> test() {
	        Map<String, String> response = new HashMap<>();
	        response.put("test", "Hello from Spring Boot!");
	        return response;
	    }
	 
	 
	 
	 @PostMapping("/insert")
	 public ResponseEntity<String> insert(@RequestBody Map<String, String> requestData) {
	     String name = requestData.get("name"); // "name" 필드의 값 추출
	     System.out.println("Received name: " + name);
	     service.insert(name);
	     
	     return ResponseEntity.ok("Success");
	 }
}
