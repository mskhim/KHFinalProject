package com.zeus.main.service;

import java.util.List;

import com.zeus.main.domain.Banner;
import com.zeus.main.domain.Main;

public interface MainService {
	 	List<Main> getTopSeries();
	 	List<Main> getByRegionRate();
	 	List<Main> getComeStartDate();
	 	List<Main> getComeEndDate();
	 	List<Banner> bannerImage();

}
