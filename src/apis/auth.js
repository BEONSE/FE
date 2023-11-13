import axios from "axios";

export function ReqCommonRegister(commonRegister) {
  return axios.post("/join", commonRegister);
}
