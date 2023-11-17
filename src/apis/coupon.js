import axios from "axios";

// 쿠폰 구매
export function ReqPaymentsByCoupon(coupons) {
  return axios.post("/coupons", coupons);
}
