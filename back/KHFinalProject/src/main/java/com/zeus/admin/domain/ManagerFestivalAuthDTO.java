package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ManagerFestivalAuthDTO {
	private Long no;
	private int publicDataEventNo;
	private int userAccountNo;
	private LocalDate regDate;
	private String eventName;
}
