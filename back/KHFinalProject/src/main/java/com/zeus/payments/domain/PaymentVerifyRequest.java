package com.zeus.payments.domain;


import java.util.List;

import lombok.Data;

@Data
public class PaymentVerifyRequest {
    private List<PaymentItem> selectedItems;
    private int totalAmount;

}

