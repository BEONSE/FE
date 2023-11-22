import { axios1 as axios } from "./axiosConfig";

// 쿠폰 구매
export function ReqPaymentsByCoupon(coupons) {
  return axios.post("/coupons", coupons);
}

// 미사용 쿠폰 목록 조회
export function ReqCouponList() {
  return axios.get("/mypage/coupons");
}

// 사용 쿠폰 목록 조회
export function ReqUsedCouponList() {
  return axios.get("/mypage/coupons/used");
}

// 보유 쿠폰 사용하기
export function ReqUseCoupon(cid, selectBranchName) {
  return axios.patch(`/mypage/coupons/${cid}`, selectBranchName);
}
