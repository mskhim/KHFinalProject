package com.zeus.event.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class SortDTO {
	private int no;
    private int page;              //페이지
    private String search;
    private LocalDate date;
    private String region;
    private String sort;
}
