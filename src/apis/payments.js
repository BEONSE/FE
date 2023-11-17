import axios from "axios";

// 포인트 결제
export function ReqPaymentsByPoint(cardInfo) {
  return axios.post("/payments", cardInfo);
}
