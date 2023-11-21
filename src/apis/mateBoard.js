import { axios1 as axios} from "./axiosConfig";

// 메이트 게시글 등록
export function ReqReadMateBoard(mateBoardItem) {
  return axios.post("/mates", mateBoardItem);
}

// 메이트 게시글 전체 조회
export function ReqMateBoardList(page) {
  return axios.get("/mates", { params: { page } });
}

// 메이트 상세 내용 조회
export function ReqMateBoardDetail(id) {
  return axios.get(`/mates/${id}`);
}

// 메이트 상세 댓글 조회
export function ReqMateBoardComment(id) {
  return axios.get(`mates/${id}/comments`);
}

// 메이트 댓글 등록
export function ReqAddComment(id, comment) {
  return axios.post(`mates/${id}/comments`, comment);
}

// 메이트 댓글 삭제
export function ReqRemoveComment(mbid, mcid) {
  return axios.patch(`mates/${mbid}/comments/${mcid}`);
}
