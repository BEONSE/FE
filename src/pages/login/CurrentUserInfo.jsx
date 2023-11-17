import { useEffect, useState } from "react";
import Sun from "../../assets/sunnyborder.png";
import styled from "styled-components";
import { ReqProfile } from "../../apis/auth";

const CurrentUserInfo = () => {
  const [currentUser, setCurrentUser] = useState({
    mid: 0,
    nickname: "",
    image: "",
    paymentAmount: 0,
    ponintAmount: 0,
    grade: 0,
  });

  // 내 프로필 요청하기
  useEffect(() => {
    async function getProfile() {
      try {
        const profileResponse = await ReqProfile();
        console.log(profileResponse);
      } catch (err) {
        console.log(err);
      }
    }
    getProfile();
  }, []);

  return (
    <>
      <Infos>
        <img src={Sun} alt="userProfile" />
        <p>{currentUser.grade}</p>
        <p>{currentUser.nickname}</p>
        <p>보유 포인트</p>
        <p>{currentUser.ponintAmount}</p>
      </Infos>
    </>
  );
};

export default CurrentUserInfo;

const Infos = styled.div``;
