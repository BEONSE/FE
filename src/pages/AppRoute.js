import { Navigate, Route, Routes } from "react-router";
import Home from "./home";
import Payment from "./payment";
import BranchReservation from "./branchReservation";
import MateList from "./board/mateList";
import Login from "./login";
import Coupon from "./coupon";
import MyPages from "./myPages";
import ReviewList from "./board/reviewList";
import Register from "./register";
import BranchReserve from "./branchReservation/BranchReserve";
import AdminManager from "./adminManager";
import BoardWrite from "./board/boardWrite";
import MyInfoUpdate from "./myPages/myInfo/MyInfoUpdate";
import BranchManager from "./branchManager";
import CouponList from "./branchManager/coupon";
import BranchUpdate from "./branchManager/branchUpdate";
import BranchReview from "./branchManager/review";
import Item from "./branchManager/review/reviewDetail";
import MateDetail from "./board/mateDetail";

const AppRoute = ({ setHideHeaderFooter }) => {
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
        <Route path="/mate/*" element={<MateList />} />
        <Route path="/admin/*" element={<AdminManager />} />
        <Route path="/mate/write" element={<BoardWrite />} />
        <Route path="/myinfo/update" element={<MyInfoUpdate />} />
        <Route path="/branch" element={<BranchManager />} />
        <Route path="/branch/couponlist" element={<CouponList />} />
        <Route path="/branch/update" element={<BranchUpdate />} />
        <Route path="/branch/review" element={<BranchReview />} />
        <Route path="/reviewitem" element={<Item />} />
        <Route path="/mate/1" element={<MateDetail />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoute;
