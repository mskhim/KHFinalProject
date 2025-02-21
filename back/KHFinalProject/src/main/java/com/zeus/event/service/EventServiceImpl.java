package com.zeus.event.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectReadDTO;
import com.zeus.event.domain.PublicDataEvent;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.event.mapper.EventMapper;
import com.zeus.user.domain.Cart;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventMapper mapper;
	@Value("${public.api.key}") // ✅ application.properties에서 설정한 API 키 사용
	private String apiKey;


	@Override
	public List<PublicDataEventDTO> selectPublicDataEvent(User user) {
		return mapper.selectPublicDataEvent(user);
	}

	@Override
	public List<EventSelectListDTO> selectEventList(SortDTO sortDTO) {
		log.info("서비스시작");
		List<EventSelectListDTO> list = mapper.selectEventList(sortDTO);
		log.info(list + "");
		return list;
	}

	@Override
	public EventSelectReadDTO selectEventRead(SortDTO sortDTO) {
		EventSelectReadDTO readDTO = new EventSelectReadDTO();
		readDTO.setEventSelectRead(mapper.selectEventRead(sortDTO));
		readDTO.setUrl(mapper.selectEventReadSub(sortDTO));
		return readDTO;
	}

	@Override
	public List<EventReview> selectEventReview(SortDTO sortDTO) {
		return mapper.selectEventReadReview(sortDTO);
	}

	@Override
	public Double selectEventReviewRating(SortDTO sortDTO) {
		Double total = 0.0;
		for (Double data : mapper.selectEventReadReviewRating(sortDTO)) {
			total += data;
		}
		return total / mapper.selectEventReadReviewCount(sortDTO);
	}

	@Override
	public int selectEventReviewCount(SortDTO sortDTO) {
		return mapper.selectEventReadReviewCount(sortDTO);
	}

	@Override
	public boolean insertEventReview(EventReview eventReview) {
		return mapper.insertEventReview(eventReview);

	}

	@Override
	public boolean deleteEventReview(EventReview eventReview) {
		return mapper.deleteEventReview(eventReview);
	}

	@Override
	public boolean deleteEvent(EventDTO eventDTO) {
		return mapper.deleteEvent(eventDTO);
	}

	@Override
	public boolean insertEventToCart(Cart cart) {
		return mapper.insertEventToCart(cart);
	}

	@Override
	public List<EventSelectListDTO> selectEventListMonth(SortDTO sortDTO) {
		return mapper.selectEventListMonth(sortDTO);
	}

	@Override
	public boolean cartDuplCheck(Cart cart) {
		int no = mapper.cartDuplCheck(cart);
		if (no >= 1) {
			return false;
		}
		return true;
	}

	@Override
	public boolean checkReserved(EventReview eventReview) {
		int no = mapper.checkReserved(eventReview);
		if (no >= 1) {
			return true;
		}
		return false;
	}

	@Override
	public boolean checkReplyAlready(EventReview eventReview) {
		int no = mapper.checkReplyAlready(eventReview);
		if (no >= 1) {
			return false;
		}
		return true;
	}

	@Override
	public boolean checkEventPrice(EventReview eventReview) {
		int price = mapper.checkEventPrice(eventReview);
		log.info(price + "");
		if (price == 0) {
			return true;
		}
		return false;
	}

	public void fetchAndSaveEvents() throws Exception {
	    String apiKey = "R1aXUY1vkohw4omiMvjBE9MfSgRp8Osgl4Fs1VnOabPAFRMl0Nj0oSBMQ3V5h5Dv2zqjcBuzpDmm5e77Y0hkkg%3D%3D";
	    int pageNo = 1;
	    int numOfRows = 100;
	    int totalCount = Integer.MAX_VALUE;
	    
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	    Date today = sdf.parse("2025-01-01");

	    // ✅ 기존 DB에 저장된 이벤트 조회 후 Set으로 변환 (축제명 + 시작일자 기준 중복 방지)
	    Set<String> existingEvents = new HashSet<>(mapper.getAllEventNamesAndDates()); 

	    while ((pageNo - 1) * numOfRows < totalCount) {
	        StringBuilder urlBuilder = new StringBuilder("http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api");
	        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + apiKey);
	        urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
	        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + numOfRows);
	        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + pageNo);

	        URL url = new URL(urlBuilder.toString());
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/json");

	        BufferedReader rd;
	        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        } else {
	            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	        }

	        StringBuilder sb = new StringBuilder();
	        String line;
	        while ((line = rd.readLine()) != null) {
	            sb.append(line);
	        }
	        rd.close();
	        conn.disconnect();

	        JSONObject jsonResponse = new JSONObject(sb.toString());
	        JSONObject body = jsonResponse.getJSONObject("response").getJSONObject("body");

	        if (pageNo == 1) {
	            totalCount = body.getInt("totalCount");
	        }

	        JSONArray eventArray = body.getJSONArray("items");

	        for (int i = 0; i < eventArray.length(); i++) {
	            JSONObject eventJson = eventArray.getJSONObject(i);

	            String eventName = eventJson.optString("fstvlNm", "알 수 없음");
	            String startDateStr = eventJson.optString("fstvlStartDate", null);
	            Date startDate = parseDate(startDateStr);

	            if (startDate == null || startDate.before(today)) {
	                continue; // ✅ 오늘 이전 데이터는 무시
	            }

	            // ✅ 중복 체크 (이벤트 이름 + 시작 날짜)
	            String eventKey = eventName + "_" + startDateStr;
	            if (existingEvents.contains(eventKey)) {
	                continue; // ✅ 이미 존재하는 데이터면 건너뛰기
	            }

	            // ✅ 새로운 데이터만 DB에 저장
	            PublicDataEvent event = new PublicDataEvent();
	            event.setNo(null);
	            event.setName(eventName);
	            event.setPlace(eventJson.optString("opar", "미정"));
	            event.setStartDate(startDate);
	            event.setEndDate(parseDate(eventJson.optString("fstvlEndDate", null)));
	            event.setContent(eventJson.optString("fstvlCo", "내용 없음").replace("+", ","));
	            event.setGoverning(eventJson.optString("mnnstNm", "정보 없음"));
	            event.setHost(eventJson.optString("auspcInsttNm", "정보 없음"));
	            event.setTel(eventJson.optString("phoneNumber", "전화번호 없음"));
	            event.setHomepage(eventJson.optString("homepageUrl", "없음"));
	            event.setAddress(eventJson.optString("rdnmadr", "주소 없음"));
	            event.setLatitude(eventJson.optDouble("latitude", 0.0));
	            event.setLongitude(eventJson.optDouble("longitude", 0.0));

	            mapper.insertEvent(event);

	            // ✅ 새로 저장한 데이터도 Set에 추가 (다음 루프에서 중복 체크 가능)
	            existingEvents.add(eventKey);
	        }

	        pageNo++; // ✅ 다음 페이지 요청
	    }
	}

	// ✅ 날짜 변환 메서드
	private Date parseDate(String dateStr) {
		if (dateStr == null || dateStr.isEmpty())
			return null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			return new java.sql.Date(sdf.parse(dateStr).getTime());
		} catch (Exception e) {
			return null;
		}
	}

}
