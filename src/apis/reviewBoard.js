import { axios1 as axios } from "./axiosConfig";

// 리뷰 리스트 조회
export function ReqReviewBoardList(id, page) {
  return axios.get(`/reviews/${id}?page=${page}`);
}
