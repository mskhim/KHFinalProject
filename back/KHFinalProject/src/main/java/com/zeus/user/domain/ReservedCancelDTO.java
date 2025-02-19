package com.zeus.user.domain;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservedCancelDTO
{
    private int no;
    private String id;
    private int eventNo;
    private int userAccount;
    private int qt;
    private Date reservedDate;
    private int totalCost;
    
    private String name;  // 축제명 추가
    private Date endDate; // 사용 기한 추가
}
