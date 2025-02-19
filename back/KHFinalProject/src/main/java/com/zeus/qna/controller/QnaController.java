package com.zeus.qna.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.config.JwtUtil;
import com.zeus.qna.domain.Qna;
import com.zeus.qna.domain.QnaDTO;
import com.zeus.qna.service.QnaService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/qna")
public class QnaController {

	@Autowired
	private QnaService qnaService;
	@Autowired
	private JwtUtil JwtUtil;

	@GetMapping("/list")
	public List<QnaDTO> getAllQna() {
		return qnaService.getAllQna();
	}

	@PostMapping("/insert")
	public ResponseEntity<?> insertQna(@CookieValue(name = "jwt", required = false) String jwtToken,
			@RequestBody Qna qna) {
		// 쿠키에서 가져온 토큰(@CookieValue (name = "jwt", required = false) String jwtToken) 가
		// 유효한지 확인
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}
		// JWT가 유효하면 사용자 정보 반환 userNo 들어있는거 반환
		int userNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
		qna.setUserAccountNo(userNo);
		qnaService.insertQna(qna);

		return ResponseEntity.ok(Map.of("authenticated", "true", "message", "qna 등록 성공"));
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateQna(@RequestBody Qna qna) {
		qnaService.updateQna(qna);
		return ResponseEntity.ok("Q&A 수정 완료");
	}

	@GetMapping("/festivalList")
	public ResponseEntity<?> getFestivalList() {

		log.info("컨트롤러 호출");
		return ResponseEntity.ok(Map.of("success", true, "eventList", qnaService.getFestivalList()));

	}

	@PostMapping("/reply")
	public ResponseEntity<?> insertReplyQna(@CookieValue(name = "jwt", required = false) String jwtToken,
			@RequestBody Qna qna) {
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}
		int userNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);

		qna.setUserAccountNo(userNo);
		qna.setNo(qna.getOriginalNo()); // 원본 질문의 NO 값을 설정

		log.info("답변 등록 요청: {}", qna);

		try {
			qnaService.insertReplyQna(qna);
			log.info("DB 저장 성공: {}", qna);
			return ResponseEntity.ok(Map.of("authenticated", true, "message", "답변 등록 성공"));
		} catch (Exception e) {
			log.error("답변 등록 실패", e);
			return ResponseEntity.status(500).body(Map.of("authenticated", false, "message", "서버 오류 발생"));
		}
	}
	
}