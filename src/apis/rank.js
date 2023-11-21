import { axios1 as axios } from "./axiosConfig";

export function reqRank() {
  return axios.get("/rank")
}