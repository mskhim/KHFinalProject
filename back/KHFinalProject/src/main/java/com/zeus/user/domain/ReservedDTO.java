package com.zeus.user.domain;

import java.time.LocalDate;
import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservedDTO
{
    private int no;        // R.NO
    private Date reservedDate;
    private String name;       // P.NAME
    private int qt;            // C.QT
    private LocalDate endDate;     // P.END_DATE
    private int totalCost;       // E.PRICE * C.QT
}
