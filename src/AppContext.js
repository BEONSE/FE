import { createContext, useEffect, useState } from "react";

const AppContext = createContext({
  nickname: "",
  accessToken: "",
  refreshToken: "",
  setNickname: function (nickname) {
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

  const value = {
    nickname,
    accessToken,
    refreshToken,
    setNickname,
    setAccessToken,
    setRefreshToken,
  };

  useEffect(() => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [nickname, accessToken, refreshToken]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
