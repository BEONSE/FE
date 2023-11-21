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
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

  const value = {
    nickname,
    role,
    accessToken,
    refreshToken,
    setNickname,
    setRole,
    setAccessToken,
    setRefreshToken,
  };

  useEffect(() => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("role", role);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [nickname, role, accessToken, refreshToken]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
