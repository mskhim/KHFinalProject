package com.zeus.manager.domain;

import java.util.List;

import lombok.Data;

@Data
public class ManagerStats {
	private int no;
	private String name;
	private List<Integer> regionData;
	private List<Double> avgRating;
	private List<Integer> genderData;
	
	
}
