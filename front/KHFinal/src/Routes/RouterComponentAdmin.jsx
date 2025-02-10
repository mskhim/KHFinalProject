import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../page/admin/include/Header";
import Aside from "../page/admin/include/Aside";
import "../page/admin/include/css/RouterComponentAdmin.css";
import {
  AdminMain,
  ManagerManage,
  UserManage,
  FestivalManage,
  ReviewManage,
  QnAManage,
  NoticeManage,
  BannerManage,
  PaymentHistoryManage,
  StatHistory,
  CancellationHistoryManage,
} from "../page/admin";
import { ProtectedRoute, Unauthorized } from "../components";

import { AdminLayout, ManagerLayout, UserLayout } from "../page/layout";

import NotFound from "../page/common/NotFound";

const RouterComponentAdmin = () => {
  const location = useLocation();
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    switch (location.pathname.split("/")[2]) {
      case "adminmain":
        setSectionName("관리자 메인");
        break;
      case "managermanage":
        setSectionName("매니저 관리");
        break;
      case "usermanage":
        setSectionName("유저 관리");
        break;
      case "festivalmanage":
        setSectionName("축제 관리");
        break;
      case "reviewmanage":
        setSectionName("리뷰 관리");
        break;
      case "qnamanage":
        setSectionName("Q&A 관리");
        break;
      case "noticemanage":
        setSectionName("공지사항 관리");
        break;
      case "bannermanage":
        setSectionName("배너 관리");
        break;
      case "paymenthistorymanage":
        setSectionName("예매내역 관리");
        break;
      case "cancellationhistorymanage":
        setSectionName("취소내역 관리");
        break;
      case "stathistory":
        setSectionName("통계 내역");
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <div className="admin-app-container">
        <Aside />
        <div className="admin-main-content">
          <Header sectionName={sectionName} />
          <div className="admin-content">
            <Routes>
              {/* ✅ 관리자 페이지 */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute requiredRole={0} endpoint="jwtAdmin">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="managermanage" element={<ManagerManage />} />
                <Route path="usermanage" element={<UserManage />} />
                <Route path="festivalmanage" element={<FestivalManage />} />
                <Route path="reviewmanage" element={<ReviewManage />} />
                <Route path="qnamanage" element={<QnAManage />} />
                <Route path="noticemanage" element={<NoticeManage />} />
                <Route path="bannermanage" element={<BannerManage />} />
                <Route
                  path="paymenthistorymanage"
                  element={<PaymentHistoryManage />}
                />
                <Route
                  path="cancellationhistorymanage"
                  element={<CancellationHistoryManage />}
                />
                <Route path="stathistory" element={<StatHistory />} />
                <Route path="adminmain" element={<AdminMain />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default RouterComponentAdmin;
