package com.zeus.payments.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.common.config.JwtUtil;
import com.zeus.payments.domain.PaymentRequest;
import com.zeus.payments.domain.PaymentVerifyRequest;
import com.zeus.payments.service.PaymentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // ✅ 쿠키 포함 허용
public class PaymentController {
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private JwtUtil JwtUtil;

	@PostMapping("/verify")
	public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody PaymentVerifyRequest request) {
		log.info(request + "");
		Map<String, Object> result = paymentService.verifyPayment(request);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/success")
	public ResponseEntity<Map<String, Object>> paymentSuccess(@RequestBody Map<String, String> requestData,
			@CookieValue(name = "jwt", required = false) String jwtToken) {
		String orderId = requestData.get("orderId");
		String paymentKey = requestData.get("paymentKey");
		String amount = requestData.get("amount");
		// ✅ JWT 토큰 검증
		if (jwtToken == null || JwtUtil.isTokenExpired(jwtToken)) {
			return ResponseEntity.ok(Map.of("authenticated", false, "message", "JWT가 없거나 만료됨"));
		}

		// ✅ JWT에서 userNo 추출
		Integer userNo = JwtUtil.validateToken(jwtToken).get("no", Integer.class);

		try {
			// ✅ orderId 파싱
			String[] orderData = orderId.split("_");
			if (orderData.length < 2) {
				return ResponseEntity.badRequest().body(Map.of("message", "잘못된 orderId 형식"));
			}
			// ✅ 첫 번째 데이터가 'data'인 경우, 실제 결제 ID는 두 번째 요소로 설정
			String verifiedPaymentId = orderData[0].equals("data") ? orderData[1] : orderData[0];
			// ✅ 이벤트-수량-ID 정보 파싱 (2번째 요소 이후부터)
			List<PaymentRequest> requestList = new ArrayList<>();
			int totalCalculatedAmount = 0; // DB에서 조회한 가격 검증용
			for (int i = 1; i < orderData.length; i++) { // 첫 번째 데이터는 결제 ID라 제외
				String[] parts = orderData[i].split("-"); // "eventNo-qt-cartNo" 형식
				if (parts.length == 3) {
					int eventNo = Integer.parseInt(parts[0]);
					int qt = Integer.parseInt(parts[1]);
					int cartNo = Integer.parseInt(parts[2]); // cart의 no

					// ✅ DB에서 eventNo의 가격 가져오기
					Integer pricePerUnit = paymentService.getEventPrice(eventNo);
					if (pricePerUnit == null) {
						return ResponseEntity.badRequest().body(Map.of("message", "해당 이벤트 가격 정보 없음: " + eventNo));
					}
					int totalPrice = pricePerUnit * qt;
					totalCalculatedAmount += totalPrice; // 총 가격 계산
					// ✅ PaymentRequest 객체 생성
					PaymentRequest paymentRequest = new PaymentRequest();
					paymentRequest.setVerifiedPaymentId(verifiedPaymentId);
					paymentRequest.setReservationId(verifiedPaymentId + "-" + eventNo+"-"+userNo+"-"+cartNo); // 예매번호 조합
					paymentRequest.setUserAccountNo(userNo);
					paymentRequest.setId(cartNo); // 장바구니 아이템 ID
					paymentRequest.setEventNo(eventNo);
					paymentRequest.setPrice(totalPrice);
					paymentRequest.setQt(qt);
					requestList.add(paymentRequest);
				}
			}

			log.info("결제 ID: " + verifiedPaymentId);
			log.info("예약 데이터: " + requestList);

			// ✅ 결제 금액 검증 (총 합산 금액과 결제 요청 금액 비교)
			if (totalCalculatedAmount != Integer.parseInt(amount)) {
				return ResponseEntity.badRequest().body(Map.of("message", "결제 금액 불일치"));
			}

			// ✅ 결제 검증 실행
			if (!paymentService.verifyPayment(paymentKey, orderId, amount)) {
				return ResponseEntity.badRequest().body(Map.of("message", "결제 검증 실패"));
			}
			log.info(requestList + "");
			// ✅ 예약 확정 및 장바구니 삭제
			boolean success = paymentService.processReservation(requestList, amount);
			if (!success) {
				return ResponseEntity.badRequest().body(Map.of("message", "예약 처리 실패"));
			}

			return ResponseEntity.ok(Map.of("message", "결제 성공 및 예약 확정 완료"));
		} catch (Exception e) {
			log.error("결제 처리 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "결제 처리 중 오류 발생"));
		}
	}

}
