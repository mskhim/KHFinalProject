package com.zeus.payments.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PaymentMapper {
	   Integer findPriceByEventNo(@Param("id") int id);

	    void insertPaymentRecord(@Param("paymentId") String paymentId, @Param("totalAmount") int totalAmount);

}
