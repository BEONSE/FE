import { axios1 as axios } from "./axiosConfig";

// 지점 예약하기
export function ReqBranchReserve(bid, reservationInfo) {
  return axios.post(`/branches/${bid}/reservation`, reservationInfo);
}