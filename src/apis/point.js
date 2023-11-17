import axios from "axios";

// 포인트 결제
export function ReqPaymentsByPoint(cardInfo) {
  return axios.post("/payments", cardInfo);
}

// 보유 포인트 확인하기
export function ReqPoints() {
  return axios.get("/points");
}
