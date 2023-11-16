import axios from "axios";

// 메이트 게시글 등록
export function ReqReadMateBoard(mateBoardItem) {
  return axios.post("/mates", mateBoardItem);
}

// 메이트 게시글 전체 조회
export function ReqMateBoardList() {
  return axios.get("/mates");
}

// 메이트 상세 내용 조회
export function ReqMateBoardDetail(id) {
  return axios.get(`/mates/${id}`);
}

// 메이트 상세 댓글 조회
export function ReqMateBoardComment(id) {
  return axios.get(`mates/${id}/comments`);
}
