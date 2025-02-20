package com.zeus.event.domain;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SortDTO {
	private int no;
    private int page;              //페이지
    private String search;
    private LocalDate date;
    private String region;
    private String sort;
    private String searchOption;
    
}
