import { createContext, useState } from "react";

const AppContext = createContext({
  nickname: "",
  accessToken: "",
  refreshToken: "",
  setUser: function (nickname) {
    this.nickname = nickname;
  },
  setAccessToken: function (accessToken) {
    this.accessToken = accessToken;
  },
  setRefreshToken: function (refreshToken) {
    this.refreshToken = refreshToken;
  },
});

export default AppContext;

export function AppContextProvider(props) {
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
}
