import { useContext } from "react";
import AppContext from "../../AppContext";
import { removeAuthHeader } from "../../apis/axiosConfig";

const Logout = ({ moveToPage, clicked }) => {
  const appContext = useContext(AppContext);

  const handleLogout = (e) => {
    removeAuthHeader();

    appContext.setAccessToken("");
    appContext.setRefreshToken("");
    appContext.setNickname("");
    appContext.setRole("");

    moveToPage();
    if (typeof clicked === "function") {
      clicked();
    }
  };

  return (
    <>
      <p onClick={handleLogout}>로그아웃</p>
    </>
  );
};

export default Logout;
