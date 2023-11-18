import { axios1 as axios } from "./axiosConfig";

// 일반 회원가입
export function ReqCommonRegister(commonRegister) {
  return axios.post("/join", commonRegister);
}

// 가맹점 회원가입

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
