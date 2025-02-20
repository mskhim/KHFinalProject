package com.zeus.manager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.config.JwtUtil;
import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventImg;
import com.zeus.manager.domain.ManagerStats;
import com.zeus.manager.service.ManagerService;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/manager")
public class ManagerController {
	@Autowired
	private ManagerService service;
	@Autowired
	private JwtUtil JwtUtil;

	private static final String UPLOAD_DIR = "C:/uploads/event"; // 업로드할 폴더 경로 (윈도우)


	@PostMapping("/insertEventByManager")
	public ResponseEntity<?> insertEventByManager(@CookieValue(name = "jwt", required = false) String jwtToken,
			@RequestBody EventDTO eventDTO) {
		log.info("컨트롤러실행");
		try {
			if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {

				log.info("토큰만료");
				return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
			}
			// JWT가 유효하면 사용자 정보 반환
			int no = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
			eventDTO.setUserAccountNo(no);
			// 이벤트 테이블에 이벤트 저장, 이후에 event의 no값은 변경된 no 값으로 변경
			eventDTO = service.insertEventByManager(eventDTO);
			// event.getNo()는 이벤트 리스트의 키no
			// ✅ 대표 이미지 저장
			String mainImagePath = eventDTO.getThumbUrl();
			EventImg ei = new EventImg();
			ei.setEventNo(eventDTO.getNo());
			ei.setThumbUrl(mainImagePath);
			service.insertEventImgByManagerThumb(ei);
			// ✅ 서브 이미지 저장

			for (int i = 0; i < eventDTO.getUrl().size(); i++) {
				ei.setThumbUrl(null);
				ei.setUrl(eventDTO.getUrl().get(i));
				service.insertEventImgByManagerSub(ei);
			}

			// ✅ DB에 저장할 정보 출력 (이후 서비스에 연결)

			return ResponseEntity.ok("파일 업로드 성공");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
		}
	}

	// 축제 INSERT할때 쓰일 MANNAGER 별 담당 데이터 확인
	@GetMapping("/selectEventStatsData")
	public ResponseEntity<Map<String, Object>> selectPublicDataEvent(
			@CookieValue(name = "jwt", required = false) String jwtToken) { // 쿠키에서 JWT 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}
		// JWT가 유효하면 사용자 정보 반환
		int no = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
		User user = new User();
		user.setNo(no);
		List<ManagerStats> dataList = service.selectEventStatsData(user);
		return ResponseEntity.ok(Map.of("authenticated", true, "message", "JWT 유효", "dataList", dataList));
	}
	
	
}
