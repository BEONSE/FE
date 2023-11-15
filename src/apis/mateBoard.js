import axios from "axios";

// 메이트 게시글 등록
export function ReqReadMateBoard(mateBoardItem) {
  return axios.post("/mates", mateBoardItem);
}

// 메이트 게시글 전체 조회
export function ReqMateBoardList() {
  return axios.get("mates");
}
