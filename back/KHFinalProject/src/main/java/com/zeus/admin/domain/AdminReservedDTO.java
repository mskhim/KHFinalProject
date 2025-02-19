package com.zeus.admin.domain;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminReservedDTO {
  private Long no;
  private String id;
  private String eventName;
  private String userId;
  private int qt;
  private LocalDate reservedDate;
  private int totalCost;
}
