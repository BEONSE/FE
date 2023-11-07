import { Route, Routes } from "react-router";

import MyCoupon from "./MyCoupon";
import MyInfo from "./myInfo";
import MyPayment from "./MyPayment";
import MyBoard from "./myboard";
import MyReservation from "./myReservation";

const MyPages = () => {
  return (
    <>
      <Routes>
        <Route path="mycoupon" element={<MyCoupon />} />
        <Route path="myinfo" element={<MyInfo />} />
        <Route path="mypayment" element={<MyPayment />} />
        <Route path="myboard" element={<MyBoard />} />
        <Route path="myreservation" element={<MyReservation />} />
      </Routes>
    </>
  );
};

export default MyPages;
