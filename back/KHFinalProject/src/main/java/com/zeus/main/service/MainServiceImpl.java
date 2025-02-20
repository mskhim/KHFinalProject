package com.zeus.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.main.domain.Banner;
import com.zeus.main.domain.Main;
import com.zeus.main.mapper.MainMapper;
import com.zeus.notice.service.NoticeServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MainServiceImpl implements MainService {

	@Autowired
    private MainMapper mainMapper;

    @Override
    public List<Main> getTopSeries() {
        return mainMapper.topSeries();
    }

    @Override
    public List<Main> getByRegionRate() {
        return mainMapper.byRegionRate();
    }

    @Override
    public List<Main> getComeStartDate() {
        return mainMapper.comeStartDate();
    }

    @Override
    public List<Main> getComeEndDate() {
        return mainMapper.comeEndDate();
    }
    
    @Override
    public List<Banner> bannerImage() {
        return mainMapper.bannerImage();
    }
}
