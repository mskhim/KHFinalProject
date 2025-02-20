package com.zeus.admin.domain;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class AdminStatsDTO {
	private List<Integer> avgData;
	private List<Integer> genderData;
	private List<Integer> reservedData;
	private List<Integer> eventData;
}
