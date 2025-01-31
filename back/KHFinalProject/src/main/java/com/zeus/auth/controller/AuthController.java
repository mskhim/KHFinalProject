package com.zeus.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/jwtAdmin")
    @PreAuthorize("hasRole('0')") // ROLE_0만 접근 가능
    public String adminAccess() {
    	log.info("어드민");
        return "Admin Access Granted!";
    }

    @GetMapping("/jwtManager")
    @PreAuthorize("hasAnyRole('0', '1')") // ROLE_0, ROLE_1 접근 가능
    public String managerAccess() {
        return "Manager Access Granted!";
    }

    @GetMapping("/jwtUser")
    @PreAuthorize("hasAnyRole('0', '1', '2')") // ROLE_0, ROLE_1, ROLE_2 접근 가능
    public String userAccess() {
    	log.info("유저");
    	
        return "User Access Granted!";
    }
}
