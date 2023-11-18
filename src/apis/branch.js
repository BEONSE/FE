import { axios1 as axios } from "./axiosConfig";

// 가맹점 위치 가져오기
export function ReqBranchPosition() {
  return axios.get("/branches/map");
}

// 가맹점 검색
export function ReqBranchSearch(keyword) {
  return axios.get("/branches/search", { params: { name: keyword } });
}
