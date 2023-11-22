import { axios1 as axios } from "./axiosConfig";

// 리뷰 리스트 조회
export function ReqReviewBoardList(id, page) {
  return axios.get(`/reviews/${id}?page=${page}`);
}

// 리뷰 쓰기
export function ReqReviewWrite(cid, formdata) {
  return axios.post(`/coupons/${cid}/reviews`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
