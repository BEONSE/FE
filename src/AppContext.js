import { createContext, useEffect, useState } from "react";

const AppContext = createContext({
  accessToken: "",
  refreshToken: "",
  setAccessToken: function (accessToken) {
    this.accessToken = accessToken;
  },
  setRefreshToken: function (refreshToken) {
    this.refreshToken = refreshToken;
  },
});

export default AppContext;

export function AppContextProvider(props) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

  const value = {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  };

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [accessToken, refreshToken]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
