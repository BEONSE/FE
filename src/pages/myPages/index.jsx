import { Route, Routes } from "react-router";
import MyCoupon from "./MyCoupon"
import MyInfo from "./MyInfo";
import MyPayment from "./MyPayment";
import MyBoard from "./myboard";

const MyPages = () => {
  return (
    <>
      <Routes>
        <Route path="mycoupon" element={<MyCoupon />} />
        <Route path="myinfo" element={<MyInfo />} />
        <Route path="mypayment" element={<MyPayment />} />
        <Route path="myboard" element={<MyBoard />} />
      </Routes>
    </>
  );
};

export default MyPages;
