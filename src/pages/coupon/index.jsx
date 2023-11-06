import { Route, Routes } from "react-router";
import PurchaseCoupon from "./PurchaseCoupon";

const Coupon = () => {
  return (
    <>
      <Routes>
        <Route path="purchasecoupon" element={<PurchaseCoupon />} />
      </Routes>
    </>
  );
};

export default Coupon;
