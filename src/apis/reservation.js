import { axios1 as axios } from "./axiosConfig";

// 지점 예약 상황 불러오기
export function ReqReservationState(bid, date) {
  return axios.get(`/reservation/${bid}/${date}`);
}

// 예약할 지점명 가져오기
export function ReqBranchName(bid) {
  return axios.get(`/reservation/${bid}`);
}

// 지점 예약하기
export function ReqBranchReserve(bid, reservationInfo) {
  return axios.post(`/branches/${bid}/reservation`, reservationInfo);
}

// 내 예약 목록 가져오기
export function ReqMyReservation() {
  return axios.get(`/mypage/reservation`);
}
