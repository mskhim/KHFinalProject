package com.zeus.main.mapper;

import java.util.List;

import com.zeus.main.domain.Banner;
import com.zeus.main.domain.Main;

public interface MainMapper {
	List<Main> topSeries();      // 최고 평점 4개 조회
	List<Main> byRegionRate();   // 지역별 최고 평점 1개씩 조회
	List<Main> comeStartDate();  // 다가오는 이벤트 (시작일 기준)
	List<Main> comeEndDate();    // 다가오는 이벤트 (종료일 기준)
	List<Banner> bannerImage();
}
