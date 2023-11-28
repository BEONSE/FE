import { Navigate, Route, Routes } from "react-router";
import Home from "./home";
import Payment from "./payment";
import BranchReservation from "./branchReservation";
import Login from "./login";
import Coupon from "./coupon";
import MyPages from "./myPages";
import ReviewList from "./board/reviewList";
import Register from "./register";
import BranchReserve from "./branchReservation/BranchReserve";
import AdminManager from "./adminManager";
import MyInfoUpdate from "./myPages/myInfo/MyInfoUpdate";
import BranchManager from "./branchManager";
import Board from "./board";
import { useContext } from "react";
import AppContext from "../AppContext";

const AppRoute = ({ setHideHeaderFooter }) => {
  const appContext = useContext(AppContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setHideHeaderFooter={setHideHeaderFooter} />} />
        <Route path="/register" element={<Register setHideHeaderFooter={setHideHeaderFooter} />} />
        <Route path="/search/*" element={<BranchReservation />} />
        <Route path="/reservation/*" element={<BranchReserve />} />
        <Route path="/payments/*" element={<Payment />} />
        <Route path="/mypages/*" element={<MyPages />} />
        <Route path="/coupon/*" element={<Coupon />} />
        <Route path="/reviews/*" element={<ReviewList />} />
        <Route path="/mate/*" element={<Board />} />
        <Route
          path="/admin/*"
          element={<AdminManager setHideHeaderFooter={setHideHeaderFooter} />}
        />
        <Route
          path="/branch/*"
          element={<BranchManager setHideHeaderFooter={setHideHeaderFooter} />}
        />
        <Route path="/myinfo/update" element={<MyInfoUpdate />} />

        {appContext.role === "ROLE_USER" && <Route path="*" element={<Navigate to="/" />} />}
        {/* 브랜치 이동 처리 홈으로 bid 생각해보셈 */}
        {appContext.role === "ROLE_BRANCH" && (
          <Route path="*" element={<Navigate to="/branch" />} />
        )}
        {appContext.role === "ROLE_ADMIN" && <Route path="*" element={<Navigate to="/admin" />} />}
      </Routes>
    </>
  );
};

export default AppRoute;
