import { createContext, useEffect, useState } from "react";

const AppContext = createContext({
  nickname: "",
  role: "",
  accessToken: "",
  refreshToken: "",
  setNickname: function (nickname) {
    this.nickname = nickname;
  },
  setRole: function (role) {
    this.role = role;
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
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

  const value = {
    nickname,
    role,
    accessToken,
    refreshToken,
    setRole,
    setAccessToken,
    setRefreshToken,
    setNickname,
  };

  useEffect(() => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("role", role);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [accessToken, refreshToken, nickname, role]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
