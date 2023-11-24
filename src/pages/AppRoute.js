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
import Item from "./branchManager/review/reviewDetail";
import Board from "./board";

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
        <Route path="/mate/*" element={<Board />} />
        <Route path="/admin/*" element={<AdminManager />} />
        <Route
          path="/branch/*"
          element={<BranchManager setHideHeaderFooter={setHideHeaderFooter} />}
        />
        <Route path="/myinfo/update" element={<MyInfoUpdate />} />
        <Route path="/reviewitem" element={<Item />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoute;
