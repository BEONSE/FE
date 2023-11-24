import { axios1 as axios } from "./axiosConfig";

// 일반 회원가입
export function ReqCommonRegister(commonRegister) {
  return axios.post("/join", commonRegister);
}

// 가맹점 회원가입
export function ReqBranchRegister(branchRegister) {
  return axios.post("/join/branch", branchRegister);
}

//이메일 중복확인
export function ReqCheckEmail(email) {
  return axios.get(`/join/${email}`, email);
}

// 로그인
export function ReqLogin(loginUser) {
  return axios.post("/login", loginUser);
}

// 유저 프로필 요청
export function ReqProfile() {
  return axios.get("/mypage");
}

//회원 정보 수정
export function ReqUpdateProfile(commonUpdate) {
  return axios.patch("/mypage/info", commonUpdate);
}

// 승인 대기 가맹점 회원
export function ReqWaitMember(page) {
  return axios.get("/admin/branch/member", { params: { page } });
}

// 승인 대기 가맹점 회원
export function ReqResultMember(page) {
  return axios.get("/admin/branch/result", { params: { page } });
}

// 전체 회원
export function ReqMember(page) {
  return axios.get("/admin/member", { params: { page } });
}
