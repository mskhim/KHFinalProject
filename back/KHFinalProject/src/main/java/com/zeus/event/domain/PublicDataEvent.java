package com.zeus.event.domain;


import java.util.Date;

import lombok.Data;

@Data
public class PublicDataEvent {
    private Long no;
    private String name;
    private String place;
    private Date startDate;
    private Date endDate;
    private String content;
    private String governing;
    private String host;
    private String tel;
    private String homepage;
    private String address;
    private Double latitude;
    private Double longitude;
}

