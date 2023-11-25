import { axios1 as axios } from "./axiosConfig";

// 쿠폰 구매
export function ReqPaymentsByCoupon(coupons) {
  return axios.post("/coupons", coupons);
}

// 미사용 쿠폰 목록 조회
export function ReqCouponList(page) {
  return axios.get("/mypage/coupons", { params : { page }});
}

// 사용 쿠폰 목록 조회
export function ReqUsedCouponList(page) {
  return axios.get("/mypage/coupons/used", { params : { page }});
}

// 보유 쿠폰 사용하기
export function ReqUseCoupon(cid, selectBranchName) {
  return axios.patch(`/mypage/coupons/${cid}`, selectBranchName);
}
