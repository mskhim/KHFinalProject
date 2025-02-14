package com.zeus.event.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.config.JwtUtil;
import com.zeus.event.domain.EventDTO;
import com.zeus.event.domain.EventReview;
import com.zeus.event.domain.EventSelectListDTO;
import com.zeus.event.domain.EventSelectReadDTO;
import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.event.service.EventService;
import com.zeus.user.domain.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/event")
public class EventController {

	@Autowired
	private EventService service;
	@Autowired
	private JwtUtil JwtUtil;

	// 축제 INSERT할때 쓰일 MANNAGER 별 담당 데이터 확인
	@GetMapping("/selectPublicDataEvent")
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
		List<PublicDataEventDTO> dataList = service.selectPublicDataEvent(user);
		return ResponseEntity.ok(Map.of("authenticated", true, "message", "JWT 유효", "dataList", dataList));
	}

	// 축제 리스트 출력
	@GetMapping("/selectEventList")
	public ResponseEntity<Map<String, Object>> selectEventList(@RequestParam int page) {
		log.info("컨트롤러시작");
		SortDTO sortDTO = new SortDTO();
		List<EventSelectListDTO> dataList = service.selectEventList(sortDTO);
		return ResponseEntity.ok(Map.of("authenticated", true, "dataList", dataList));
	}

	// 축제 삭제
	@DeleteMapping("/deleteEvent")
	public ResponseEntity<Map<String, Object>> deleteEvent(@CookieValue(name = "jwt", required = false) String jwtToken,
			@RequestBody EventDTO eventDTO) { // 쿠키에서 JWT 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}
		String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
		int jwtUserNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);

		if (jwtUserNo != eventDTO.getUserAccountNo() && jwtRole.equals("ROLE_1") || jwtRole.equals("ROLE_0")) {
			return ResponseEntity.ok(Map.of("state", false, "message", "자신의 축제 게시글만 삭제 가능합니다."));
		}

		boolean flag = service.deleteEvent(eventDTO);
		return ResponseEntity.ok(Map.of("state", flag, "message", "축제 게시글이 삭제되었습니다."));
	}

	// 축제 조회
	@GetMapping("/selectEventRead")
	public ResponseEntity<Map<String, Object>> selectEventRead(@RequestParam int no) {
		SortDTO sortDTO = new SortDTO();
		sortDTO.setNo(no);
		EventSelectReadDTO dataList = service.selectEventRead(sortDTO);
		return ResponseEntity.ok(Map.of("authenticated", true, "dataList", dataList));
	}

	// 축제 리뷰 조회
//	@PreAuthorize("hasAnyAuthority('ROLE_0', 'ROLE_1')")
	@GetMapping("/selectEventReview")
	public ResponseEntity<Map<String, Object>> selectEventRivew(@RequestParam int page, @RequestParam int no) {
		SortDTO sortDTO = new SortDTO();
		sortDTO.setNo(no);
		sortDTO.setPage(page);
		List<EventReview> dataList = service.selectEventReview(sortDTO);

		return ResponseEntity.ok(Map.of("authenticated", true, "dataList", dataList, "rating",
				service.selectEventReviewRating(sortDTO), "count", service.selectEventReviewCount(sortDTO)));
	}

	// 축제 리뷰 추가
	@PostMapping("/insertEventReview")
	public ResponseEntity<Map<String, Object>> insertEventReview(
			@CookieValue(name = "jwt", required = false) String jwtToken, @RequestBody EventReview eventReview) { // 쿠키에서
																													// JWT
																													// 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}
		String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
		if (!jwtRole.equals("ROLE_0")) {
			return ResponseEntity.ok(Map.of("state", false, "message", "일반 유저만 리뷰 작성 가능."));
		}
		service.insertEventReview(eventReview);

		return ResponseEntity.ok(Map.of("state", true, "message", "리뷰등록에 성공했습니다."));
	}

	// 축제 리뷰 삭제
	@DeleteMapping("/deleteEventReview")
	public ResponseEntity<Map<String, Object>> deleteEventReview(
			@CookieValue(name = "jwt", required = false) String jwtToken, @RequestBody EventReview eventReview) { // 쿠키에서
																													// JWT
																													// 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}
		String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
		int jwtUserNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);

		if (jwtUserNo != eventReview.getUserAccountNo() || jwtRole.equals("ROLE_0")) {
			return ResponseEntity.ok(Map.of("state", false, "message", "자신의 리뷰만 삭제 가능합니다."));
		}
		boolean flag = service.deleteEventReview(eventReview);
		return ResponseEntity.ok(Map.of("state", flag, "message", "리뷰가 삭제되었습니다."));
	}
}
