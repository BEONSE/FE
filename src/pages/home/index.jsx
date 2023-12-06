import { CommonButton } from "../../components/CommonButton";
import styled from "styled-components";
import GlobalStyle from "../../components/GlobalStyle";

import GetWeather from "../weather/GetWeather";
import Rank from "./Rank";
import MainImage from "../../assets/MainBackgroundImage.jpg";
import ArrowImg from "../../assets/arrow.png";
import { usePageMoving } from "../../components/usePageMoving";
import { useContext } from "react";
import AppContext from "../../AppContext";

const Home = () => {
  const { moveToSearch } = usePageMoving();
  const appContext = useContext(AppContext);

  return (
    <>
      <GlobalStyle />
      <HomeAllDiv>
        <MainDiv>
          <h1>BEONSE</h1>
          <p>
            <span>비온</span> 후에 <span>세</span>차하자
          </p>
        </MainDiv>

        <MainItems>
          <GetWeather />
          <Rank />
        </MainItems>

        <ReservationDiv
          onClick={() => {
            moveToSearch();
          }}
        >
          <ResButton>지점 예약 하러가기</ResButton>
          <img src={ArrowImg} alt="ArrowImage" />
        </ReservationDiv>
      </HomeAllDiv>
    </>
  );
};

export default Home;

/* Styled Component*/
// Home 전체 div
const HomeAllDiv = styled.div`
  width: 35vw;
  @media (max-width: 1170px) {
    width: 100vw;
  }
  margin: auto;
`;
// 메인 화면 요소
const MainDiv = styled.div`
  position: relative;
  width: 35vw;
  @media (max-width: 1170px) {
    width: 100vw;
  }
  height: 40vh;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #99e8f8;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${MainImage});
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px); /* 이미지를 흐리게 만듭니다. */
    opacity: 0.8; /* 흐린 이미지의 투명도를 조절합니다. */
    z-index: -1;
  }

  & > h1,
  & > p {
    position: relative;
    z-index: 1;
  }

  & > h1 {
    font-size: 50px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }

  & > p {
    font-size: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    margin-bottom: 5vh;
    font-weight: bold;
    color: #99e8f8;
  }

  & > p > span {
    color: #ffee00;
    font-weight: bold;
    font-size: 26px;
  }
`;

// 날씨 추천 & 이달의 세차왕
const MainItems = styled.div`
  width: 90vw;
  margin: auto;
`;

// 예약하러가기 button
const ResButton = styled(CommonButton)`
  background-color: rgba(255, 255, 255, 0);
  width: 80%;
  font-size: 16px;
`;

// 예약하러가기 div
const ReservationDiv = styled.div`
  display: flex;
  justify-content: center;

  width: 35vw;
  @media (max-width: 1170px) {
    width: 90vw;
  }

  border-radius: 8px;
  background-color: #99e8f8;

  margin: auto;
  margin-bottom: 3vh;
  margin-top: 3vh;
  transition: background-color 0.5s ease, transform 0.1s ease;

  &:hover {
    background-color: #68d0f3;

    & > img {
      filter: brightness(0.8);
    }
  }

  &:active {
    transform: translate(1px, 1px);
  }

  & > img {
    width: 30px;
  }
`;

/* <a href="https://www.flaticon.com/kr/free-icons/" title="확대경 아이콘">확대경 아이콘  제작자: Freepik - Flaticon</a> */
