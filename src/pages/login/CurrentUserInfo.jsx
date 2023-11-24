import React, { useContext, useEffect, useState } from "react";
import Sun from "../../assets/sunnyborder.png";
import styled from "styled-components";
import { ReqProfile } from "../../apis/auth";
import Grade1 from "../../assets/grade1.png";
import Grade2 from "../../assets/grade2.png";
import Grade3 from "../../assets/grade3.png";
import { removeAuthHeader } from "../../apis/axiosConfig";
import AppContext from "../../AppContext";

const CurrentUserInfo = () => {
  const appContext = useContext(AppContext);

  const [currentUser, setCurrentUser] = useState({
    mid: 0,
    nickname: "",
    image: "",
    paymentAmount: 0,
    pointAmount: 0,
    grade: 0,
  });

  // 내 프로필 요청하기
  useEffect(() => {
    async function getProfile() {
      try {
        const profileResponse = await ReqProfile();
        console.log(profileResponse);
        if (profileResponse.status === 200) {
          setCurrentUser({
            ...currentUser,
            mid: profileResponse.data.mid,
            nickname: profileResponse.data.nickname,
            image: profileResponse.data.image,
            paymentAmount: profileResponse.data.paymentAmount,
            pointAmount: profileResponse.data.pointAmount,
            grade: profileResponse.data.grade,
          });
        }
      } catch (err) {
        if (err.response.data.message === "토큰 시간 만료") {
          alert("토큰이 만료되었습니다.")
        }
        removeAuthHeader();
        appContext.setAccessToken("");
        appContext.setRefreshToken("");
        console.log(err);
      }
    }
    getProfile();
  }, []);

  return (
    <>
      <Infos>
        <ProfileImg>
          {currentUser.image ? (<img src={`data:image/png;base64,${currentUser.image}`} alt="review" />) : (<img src={Sun} alt="기본 이미지" />)}
        </ProfileImg>
        <Profile>
          <Grade>
            <p>{currentUser.nickname}</p>
            <span>
              {currentUser.grade === 1 && <img src={Grade1} alt="grade1" />}
              {currentUser.grade === 2 && <img src={Grade2} alt="grade2" />}
              {currentUser.grade === 3 && <img src={Grade3} alt="grade3" />}
            </span>
          </Grade>
          <Point>
            <h1>보유 포인트</h1>
            <p>{currentUser.pointAmount.toLocaleString()}p</p>
          </Point>
        </Profile>
      </Infos>
    </>
  );
};

export default CurrentUserInfo;

// 프로필 전체 정보 div
const Infos = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
`;

// 프로필 이미지
const ProfileImg = styled.div`
  margin-right: 5vw;
  & > img {
    height: 10vh;
  }
`;

// 프로필 등급, 닉네임, 보유 포인트
const Profile = styled.div`
  width: 55%;
`;

const Grade = styled.div`
  display: flex;
  align-items: center;
  & > p,
  span {
    display: flex;
    align-items: flex-end;
    font-size: 18px;

    & > img {
      height: 2.5vh;
    }
  }
  & > p {
    margin-right: 1vh;
  }
`;

// 보유 포인트
const Point = styled.div`
  margin-top: 1vh;
  & > p,
  h1 {
    text-align: right;
    font-size: 17px;
  }
`;
