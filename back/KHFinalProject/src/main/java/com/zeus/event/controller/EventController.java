package com.zeus.event.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.zeus.user.domain.Cart;
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
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "로그인이 필요합니다."));
		}
		// JWT가 유효하면 사용자 정보 반환
		int no = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
		User user = new User();
		user.setNo(no);
		List<PublicDataEventDTO> dataList = service.selectPublicDataEvent(user);
		return ResponseEntity.ok(Map.of("authenticated", true, "message", "JWT 유효", "dataList", dataList));
	}

	// 축제 리스트 출력
	@PostMapping("/selectEventList")
	public ResponseEntity<Map<String, Object>> selectEventList(@RequestBody SortDTO sortDTO) {
		List<EventSelectListDTO> dataList = service.selectEventList(sortDTO);
		return ResponseEntity.ok(Map.of("state", true, "dataList", dataList));
	}

	// 축제 리스트 출력
	@PostMapping("/selectEventListMonth")
	public ResponseEntity<Map<String, Object>> selectEventListMonth(@RequestBody SortDTO sortDTO) {
		log.info(sortDTO.getDate() + "");
		List<EventSelectListDTO> dataList = service.selectEventListMonth(sortDTO);
		return ResponseEntity.ok(Map.of("state", true, "dataList", dataList));
	}

	// 축제 삭제
	@DeleteMapping("/deleteEvent")
	public ResponseEntity<Map<String, Object>> deleteEvent(@CookieValue(name = "jwt", required = false) String jwtToken,
			@RequestBody EventDTO eventDTO) { // 쿠키에서 JWT 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "로그인이 필요합니다."));
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
//	@PreAuthorize("hasAnyAuthority('ROLE_0', 'ROLE_2')")
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
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "로그인이 필요합니다."));
		}
		String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
		int userAccountNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
		eventReview.setUserAccountNo(userAccountNo);
		if (jwtRole.equals("ROLE_1")) {
			return ResponseEntity.ok(Map.of("state", false, "message", "일반 유저만 리뷰 작성 가능합니다."));
		}

		if (service.checkEventPrice(eventReview)) {
			service.insertEventReview(eventReview);
			return ResponseEntity.ok(Map.of("state", true, "message", "리뷰를 등록해주셔서 감사합니다."));
		}
		if (!service.checkReplyAlready(eventReview)) {
			return ResponseEntity.ok(Map.of("state", false, "message", "이미 리뷰를 작성한 축제입니다."));

		}
		if (!service.checkReserved(eventReview)) {
			return ResponseEntity.ok(Map.of("state", false, "message", "예매한 축제만 리뷰 작성 가능합니다."));
		}
		service.insertEventReview(eventReview);
		return ResponseEntity.ok(Map.of("state", true, "message", "리뷰를 등록해주셔서 감사합니다."));

	}

	// 축제 리뷰 삭제
	@DeleteMapping("/deleteEventReview")
	public ResponseEntity<Map<String, Object>> deleteEventReview(
			@CookieValue(name = "jwt", required = false) String jwtToken, @RequestBody EventReview eventReview) { // 쿠키에서
																													// 가져오기
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "로그인이 필요합니다."));
		}
		String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
		int jwtUserNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);

		if (jwtUserNo == eventReview.getUserAccountNo() || jwtRole.equals("ROLE_0")) {
			boolean flag = service.deleteEventReview(eventReview);
			return ResponseEntity.ok(Map.of("state", flag, "message", "리뷰가 삭제되었습니다."));
		}
		return ResponseEntity.ok(Map.of("state", false, "message", "자신의 리뷰만 삭제 가능합니다."));
	}

	// 축제 장바구니에 추가
	@PostMapping("/insertEventToCart")
	public ResponseEntity<Map<String, Object>> insertEventToCart(
			@CookieValue(name = "jwt", required = false) String jwtToken, @RequestBody Cart cart) { // 쿠키에서
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			log.info("토큰만료");
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "로그인이 필요합니다."));
		}
		String jwtRole = JwtUtil.validateToken(jwtToken).get("role", String.class);
		int jwtUserNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
		if (jwtRole.equals("ROLE_0") || jwtRole.equals("ROLE_1")) {
			return ResponseEntity.ok(Map.of("state", false, "message", "일반회원만 장바구니 이용이 가능합니다."));
		}
		cart.setUserAccountNo(jwtUserNo);
		boolean flag = service.cartDuplCheck(cart);
		if (!flag) {
			return ResponseEntity.ok(Map.of("state", flag, "message", "이미 장바구니에 담긴 항목입니다."));
		}
		flag = service.insertEventToCart(cart);
		return ResponseEntity.ok(Map.of("state", flag, "message", "장바구니에 등록되었습니다."));
	}
	  @GetMapping("/fetch")
	    public String fetchAndSaveEvents() throws Exception {
	        service.fetchAndSaveEvents();
	        return "공공데이터 API에서 새로운 데이터를 가져와 추가했습니다.";
	    }
}
