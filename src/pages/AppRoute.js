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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoute;
