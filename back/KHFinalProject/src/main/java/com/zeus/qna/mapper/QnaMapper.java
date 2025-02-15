package com.zeus.qna.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.qna.domain.Qna;
import com.zeus.qna.domain.QnaDTO;

@Mapper
public interface QnaMapper {
    List<QnaDTO> getAllQna();
    void insertQna(Qna qna);
    void updateQna(Qna qna);
    List<PublicDataEventDTO> getFestivalList();
}