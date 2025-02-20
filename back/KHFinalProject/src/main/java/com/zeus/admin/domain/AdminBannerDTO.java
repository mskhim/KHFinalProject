package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminBannerDTO {
	private Long no;
	private String url;
	private LocalDate subDate;
	private String eventName;
}
