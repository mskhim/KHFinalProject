package com.zeus.payments.service;

import java.util.Map;

import com.zeus.payments.domain.PaymentVerifyRequest;

public interface PaymentService {
	Map<String, Object> verifyPayment(PaymentVerifyRequest request);
}
