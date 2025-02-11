package com.zeus.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/jwtAdmin")
    public String adminAccess() {
        return "Admin Access Granted!";
    }

    @GetMapping("/jwtManager")
    public String managerAccess() {
        return "Manager Access Granted!";
    }

    @GetMapping("/jwtUser")
    public String userAccess() {
        return "User Access Granted!";
    }
}
