package com.zeus.manager.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.event.domain.Event;
import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;
import com.zeus.manager.domain.ManagerStats;
import com.zeus.manager.mapper.ManagerMapper;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class ManagerServiceImpl implements ManagerService {
	@Autowired
	private ManagerMapper mapper;

	@Override
	public EventDTO insertEventByManager(EventDTO eventDTO) {
		// TODO Auto-generated method stub
		mapper.insertEventByManager(eventDTO);
		return eventDTO;
	}

	@Override
	public Event insertEventImgByManagerThumb(EventImg eventImg) {
		mapper.insertEventImgByManagerThumb(eventImg);
		return null;
	}
	@Override
	public Event insertEventImgByManagerSub(EventImg eventImg) {
		mapper.insertEventImgByManagerSub(eventImg);
		return null;
	}

	@Override
	public List<ManagerStats> selectEventStatsData(User user) {
		  List<Map<String, Object>> rawData =mapper.getManagerEventStatistics(user);
	        List<ManagerStats> statsList = new ArrayList<>();
	        for (Map<String, Object> data : rawData) {
	            ManagerStats stats = new ManagerStats();
	            
	            stats.setNo((getIntValue(data, "EVENTNO"))); 
	            stats.setName((getStringValue(data, "EVENTNAME")));

	            // 지역 데이터 변환
	            List<Integer> regionData = new ArrayList<>();
	            regionData.add(getIntValue(data, "REGION_SEOUL"));
	            regionData.add(getIntValue(data, "REGION_GYEONGGI"));
	            regionData.add(getIntValue(data, "REGION_GANGWON"));
	            regionData.add(getIntValue(data, "REGION_CHUNGBUK"));
	            regionData.add(getIntValue(data, "REGION_CHUNGNAM"));
	            regionData.add(getIntValue(data, "REGION_JEONBUK"));
	            regionData.add(getIntValue(data, "REGION_JEONNAM"));
	            regionData.add(getIntValue(data, "REGION_GYEONGBUK"));
	            regionData.add(getIntValue(data, "REGION_GYEONGNAM"));
	            regionData.add(getIntValue(data, "REGION_JEJU"));
	            stats.setRegionData(regionData);

	            // ✅ 연령대별 평균 평점 데이터 변환 (BigDecimal → Double)
	            List<Double> avgRating = new ArrayList<>();
	            avgRating.add(getDoubleValue(data, "RATING_10S"));
	            avgRating.add(getDoubleValue(data, "RATING_20S"));
	            avgRating.add(getDoubleValue(data, "RATING_30S"));
	            avgRating.add(getDoubleValue(data, "RATING_40S"));
	            avgRating.add(getDoubleValue(data, "RATING_50S"));
	            stats.setAvgRating(avgRating);

	            // ✅ 성별 데이터 변환 (BigDecimal → Integer)
	            List<Integer> genderData = new ArrayList<>();
	            genderData.add(getIntValue(data, "MALE_COUNT"));
	            genderData.add(getIntValue(data, "FEMALE_COUNT"));
	            stats.setGenderData(genderData);

	            statsList.add(stats);
	        }

	        return statsList;
	    }

    // ✅ 안전한 `Integer` 변환 (`BigDecimal` → `int`)
    private int getIntValue(Map<String, Object> map, String key) {
        Object value = map.get(key.toUpperCase()); // 대문자로 조회
        if (value instanceof BigDecimal) {
            return ((BigDecimal) value).intValue();
        } else if (value instanceof Number) {
            return ((Number) value).intValue();
        }
        return 0;
    }

    // ✅ 안전한 `Double` 변환 (`BigDecimal` → `double`)
    private double getDoubleValue(Map<String, Object> map, String key) {
        Object value = map.get(key.toUpperCase()); // 대문자로 조회
        if (value instanceof BigDecimal) {
            return ((BigDecimal) value).doubleValue();
        } else if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }
        return 0.0;
    }

    // ✅ 안전한 `String` 변환 (`null` 방지)
    private String getStringValue(Map<String, Object> map, String key) {
        Object value = map.get(key.toUpperCase()); // 대문자로 조회
        return value == null ? "" : value.toString();
    }

}
