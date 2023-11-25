import { createContext, useEffect, useState } from "react";

const AppContext = createContext({
  nickname: "",
  accessToken: "",
  refreshToken: "",
  setNickname: function(nickname) {
    this.accessToken = nickname;
  },
  setAccessToken: function(accessToken) {
    this.accessToken = accessToken;
  },
  setRefreshToken: function(refreshToken) {
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
    setAccessToken,
    setRefreshToken,
    setNickname,
  };

  useEffect(() => {
    localStorage.setItem("nickname", nickname);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [accessToken, refreshToken, nickname]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
