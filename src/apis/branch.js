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

// 가맹점 지점명들 가져오기
export function ReqBranchNames() {
  return axios.get("/branches/names");
}

//가맹점 별 리뷰 가져오기
export function ReqBranchReview(bid) {
  return axios.get(`/reviews/${bid}`, bid);
}

//가맹점 별 쿠폰 가져오기
export function ReqBranchCoupon() {
  return axios.get("/branches/coupons");
}

//가맹점 정보 수정
export function ReqBranchUpdate(formData) {
  return axios.patch("branches/info", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
