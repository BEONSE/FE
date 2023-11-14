import axios from "axios";

// 일반 회원가입
export function ReqCommonRegister(commonRegister) {
  return axios.post("/join", commonRegister);
}

// 가맹점 회원가입

// 로그인
export function ReqLogin(loginUser) {
  return axios.post("/login", loginUser);
}
