package com.zeus.main.domain;

import java.time.LocalDate;

import com.zeus.notice.domain.Notice;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Main {
	private int no;
    private String name;
    private String thumbUrl;
    private double avgRating;
    private String address;
}
