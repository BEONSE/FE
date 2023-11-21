import { axios1 as axios } from "./axiosConfig";

// 가맹점들 위치 가져오기
export function ReqBranchPosition() {
  return axios.get("/branches");
}

// 가맹점 검색
export function ReqBranchSearch(keyword) {
  return axios.get("/branches/search", { params: { name: keyword } });
}

// 가맹점 한개의 정보 가져오기
export function ReqBranchInfo(bid) {
  return axios.get(`/branches/${bid}`);
}
