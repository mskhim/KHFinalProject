package com.zeus.qna.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.config.JwtUtil;
import com.zeus.event.domain.SortDTO;
import com.zeus.qna.domain.Qna;
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

	@PostMapping("/list")
	public ResponseEntity<?> getAllQna(@RequestBody SortDTO sortDTO) {
		int totalPages = qnaService.getPageCount(sortDTO);
		log.info(totalPages+"");
		return ResponseEntity.ok(Map.of("authenticated", "true","totalPages",totalPages,"ListData",qnaService.getAllQna(sortDTO)));
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

	@GetMapping("/getReply")
	public ResponseEntity<?> getReply(@RequestParam int no) {

		log.info("답변 등록 요청: {}", no);
		Qna qna = new Qna();
		qna.setNo(no);
		try {
			String content = qnaService.getReply(qna);
			if (content==null) {
				return ResponseEntity.ok(Map.of("content", "등록된 답변이 없습니다."));
			} 
			return ResponseEntity.ok(Map.of("content", content));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(Map.of("authenticated", false, "message", "서버 오류 발생"));
		}
	}
	
	@GetMapping("/getisAuthenticated")
	public ResponseEntity<?> getisAuthenticated(@CookieValue(name = "jwt", required = false) String jwtToken,
			@RequestParam int eventNo) {
		// 쿠키에서 가져온 토큰(@CookieValue (name = "jwt", required = false) String jwtToken) 가
		// 유효한지 확인
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}
		// JWT가 유효하면 사용자 정보 반환 userNo 들어있는거 반환
		int userNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);
		Qna qna= new Qna();
		qna.setEventNo(eventNo);
		qna.setUserAccountNo(userNo);
		boolean flag = qnaService.getisAuthenticated(qna);
		log.info(flag+"");
		return ResponseEntity.ok(Map.of("authenticated", "true","flag",flag));
	}
	@DeleteMapping("/delete")
    public ResponseEntity<?> deleteQna(@RequestParam int no) {
		log.info(no+"");
        try {
            qnaService.deletePostAndReplies(no);
            return ResponseEntity.ok(Map.of("success", true, "message", "게시글 및 답변 삭제 완료"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "삭제 중 오류 발생"));
        }
    }

}