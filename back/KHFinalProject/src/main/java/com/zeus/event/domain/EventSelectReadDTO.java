package com.zeus.event.domain;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventSelectReadDTO {
	private EventSelectRead eventSelectRead;
	private List<String> url;

}
