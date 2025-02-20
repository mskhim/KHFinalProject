package com.zeus.qna.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.event.domain.PublicDataEventDTO;
import com.zeus.event.domain.SortDTO;
import com.zeus.qna.domain.Qna;
import com.zeus.qna.domain.QnaDTO;

@Mapper
public interface QnaMapper {
    List<QnaDTO> getAllQna(SortDTO sortDTO);
    void insertQna(Qna qna);
    void updateQna(Qna qna);
    List<PublicDataEventDTO> getFestivalList();
    void insertReplyQna(Qna qna);
	String getReply(Qna qna);
	int getPageCount(SortDTO sortDTO);
	int getisAuthenticated(Qna qna);
	void deletePostAndReplies(int no);
}