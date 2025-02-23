/**
 * 
 */
package com.zeus.payments.service;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.zeus.payments.domain.PaymentItem;
import com.zeus.payments.domain.PaymentRequest;
import com.zeus.payments.domain.PaymentVerifyRequest;
import com.zeus.payments.mapper.PaymentMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentMapper mapper;

	@Value("${toss.secret-key}")
	private String tossSecretKey;
	private final RestTemplate restTemplate = new RestTemplate();

	@Override
	public Map<String, Object> verifyPayment(PaymentVerifyRequest request) {
		List<PaymentItem> items = request.getSelectedItems();
		int calculatedTotal = 0;

		for (PaymentItem item : items) {
			// DB에서 event_no로 해당 이벤트 가격 가져오기
			Integer eventPrice = mapper.getEventPrice(item.getEventNo());

			if (eventPrice == null) {
				return createResponse(false, "상품 정보를 찾을 수 없습니다.", null);
			}

			// 개별 가격 검증
			int expectedTotal = eventPrice * item.getQt();
			if (expectedTotal != item.getPrice() * item.getQt()) {
				return createResponse(false, "가격이 일치하지 않습니다.", null);
			}

			// 총 가격 계산
			calculatedTotal += expectedTotal;
		}

		// 최종 totalAmount 검증
		if (calculatedTotal != request.getTotalAmount()) {
			return createResponse(false, "총 결제 금액이 일치하지 않습니다.", null);
		}

		// ✅ 검증 성공 시 결제번호 생성
		String paymentId = UUID.randomUUID().toString().replace("-", "").substring(0, 8);

		return createResponse(true, "결제 검증 성공", paymentId);
	}


	@Override
	public boolean verifyPayment(String paymentKey, String orderId, String amount) {
		try {
			String url = "https://api.tosspayments.com/v1/payments/confirm";

			// 인증 헤더 생성
			String encodedKey = Base64.getEncoder().encodeToString((tossSecretKey + ":").getBytes());
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Basic " + encodedKey);

			// 요청 바디 생성
			Map<String, String> requestBody = Map.of("paymentKey", paymentKey, "orderId", orderId, "amount", amount);

			HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

			// 요청 전송
			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

			// 응답 상태 코드 확인 (200 OK)
			return response.getStatusCode() == HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean processReservation(List<PaymentRequest> requestList, String amount) {
	    try {
	        int totalCalculatedAmount = 0; // 검증을 위한 총 금액

	        for (PaymentRequest request : requestList) {
	            int eventNo = request.getEventNo();
	            int qt = request.getQt();

	            // ✅ 이벤트 가격 가져오기
	            Integer pricePerUnit = mapper.getEventPrice(eventNo);
	            if (pricePerUnit == null) {
	                throw new IllegalArgumentException("해당 이벤트 번호의 가격 정보를 찾을 수 없습니다: " + eventNo);
	            }

	            int totalPrice = pricePerUnit * qt;
	            totalCalculatedAmount += totalPrice; // 총 가격 계산

	            // ✅ PaymentRequest 객체의 가격과 일치하는지 검증
	            if (request.getPrice() != totalPrice) {
	                throw new IllegalArgumentException("가격 불일치: eventNo=" + eventNo + ", 예상 가격=" + totalPrice + ", 요청 가격=" + request.getPrice());
	            }
	        }

	        // ✅ 최종 결제 금액 검증
	        if (totalCalculatedAmount != Integer.parseInt(amount)) {
	            throw new IllegalArgumentException("결제 금액 검증 실패: 계산된 총액=" + totalCalculatedAmount + ", 요청된 총액=" + amount);
	        }

	        // ✅ 예약 확정 및 장바구니 삭제 실행
	        for (PaymentRequest request : requestList) {
	            // ✅ 예약 테이블에 삽입
	            mapper.insertReservation(
	             request
	            );

	            // ✅ 장바구니에서 해당 아이템 삭제
	            mapper.deleteCartItem(request.getId());
	        }

	        return true;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false; // 트랜잭션 롤백됨
	    }
	}

	  @Override
	    public Integer getEventPrice(int eventNo) {
	        return mapper.getEventPrice(eventNo);
	    }
	private Map<String, Object> createResponse(boolean success, String message, String paymentId) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", success);
		response.put("message", message);
		if (paymentId != null) {
			response.put("paymentId", paymentId);
		}
		return response;
	}

}
