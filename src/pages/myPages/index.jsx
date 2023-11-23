import { Route, Routes } from "react-router";

import MyCoupon from "./MyCoupon";
import MyInfo from "./myInfo";
import MyBoard from "./myboard";
import MyReservation from "./myReservation";
import MyPayment from "./myPayment";

const MyPages = () => {
  return (
    <>
      <Routes>
        <Route path="mycoupon" element={<MyCoupon />} />
        <Route path="myinfo" element={<MyInfo />} />
        <Route path="mypayment" element={<MyPayment />} />
        <Route path="myboard" element={<MyBoard />} />
        <Route path="reservation" element={<MyReservation />} />
      </Routes>
    </>
  );
};

export default MyPages;
