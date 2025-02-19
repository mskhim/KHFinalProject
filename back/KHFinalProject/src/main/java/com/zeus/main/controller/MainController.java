package com.zeus.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.main.domain.Banner;
import com.zeus.main.domain.Main;
import com.zeus.main.service.MainService;

@RestController
@RequestMapping(value = "/main")
public class MainController {

	@Autowired
	private MainService service;
	
	@GetMapping("/topSeries")
    public List<Main> topSeries() {
        return service.getTopSeries();
    }

    @GetMapping("/byRegionRate")
    public List<Main> byRegionRate() {
        return service.getByRegionRate();
    }

    @GetMapping("/comeStartDate")
    public List<Main> comeStartDate() {
        return service.getComeStartDate();
    }

    @GetMapping("/comeEndDate")
    public List<Main> comeEndDate() {
        return service.getComeEndDate();
    }
    
    @GetMapping("/bannerImage")
    public List<Banner> bannerImage() {
        return service.bannerImage();
    }
    

}
