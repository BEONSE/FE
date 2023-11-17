import { axios1 as axios } from "./axiosConfig";

// 쿠폰 구매
export function ReqPaymentsByCoupon(coupons) {
  return axios.post("/coupons", coupons);
}

// 보우 쿠폰 목록 조회
export function ReqCouponList() {
  return axios.get("/mypages/coupons");
}
