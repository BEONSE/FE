import { Navigate, Route, Routes } from "react-router";
import Home from "./home";
import Payment from "./payment";
import BranchReservation from "./branchReservation";
import BoardWrite from "./board/boardWrite";
import MateList from "./board/mateList";
import Login from "./login";
import Coupon from "./coupon";
import MyPages from "./myPages";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/branchies/*" element={<BranchReservation />} />
        <Route path="/payments/*" element={<Payment />} />
        <Route path="/mypages/*" element={<MyPages />} />
        <Route path="/coupon/*" element={<Coupon />} />
        <Route path="/reviews/*" element={<BoardWrite />} />
        <Route path="/mate/*" element={<MateList />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoute;
