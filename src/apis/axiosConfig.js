import axios from "axios";

export const axios1 = axios.create({
  baseURL: "http://localhost:8080",
});

export function addAuthHeader(accessToken) {
  axios1.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}

export function removeAuthHeader() {
  delete axios1.defaults.headers.common["Authorization"];
}
