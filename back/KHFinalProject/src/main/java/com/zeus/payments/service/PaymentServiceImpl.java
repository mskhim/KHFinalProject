/**
 * 
 */
package com.zeus.payments.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.payments.domain.PaymentVerifyRequest;
import com.zeus.payments.domain.PaymentVerifyRequest.PaymentItem;
import com.zeus.payments.mapper.PaymentMapper;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentMapper paymentMapper;
	@Override
	public Map<String, Object> verifyPayment(PaymentVerifyRequest request) {
        List<PaymentItem> items = request.getSelectedItems();
        int calculatedTotal = 0;

        for (PaymentItem item : items) {
            // DB에서 event_no로 해당 이벤트 가격 가져오기
            Integer eventPrice = paymentMapper.findPriceByEventNo(item.getId());

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
        String paymentId = UUID.randomUUID().toString();

        return createResponse(true, "결제 검증 성공", paymentId);
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
