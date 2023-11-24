import { axios1 as axios } from "./axiosConfig";

// 포인트 결제
export function ReqPaymentsByPoint(cardInfo) {
  return axios.post("/payments", cardInfo);
}

// 보유 포인트 확인하기
export function ReqPoints() {
  return axios.get("/points");
}

// 보유 포인트 확인하기
export function ReqMyPayment(page) {
  return axios.get("/mypage/payments", { params : {page} });
}

// 전체 회원 포인트 결제 내역
export function ReqPayment(page) {
  return axios.get("/admin/payments", { params : {page} });
}

