package com.zeus.event.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class Event {
    private int no;               // 시퀀스 (PK)
    private int publicDataEventNo; // 공공데이터 축제번호 (FK)
    private int userAccountNo;     // 작성자(매니저) (FK)
    private Integer price;         // 이용권 가격
    private Double rating;         // 평점
    private List<EventImg> eventImages; // ✅ 이벤트 이미지 리스트 포함
}
