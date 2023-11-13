import { CommonButton } from "../../components/CommonButton";
import styled from "styled-components";
import GlobalStyle from "../../components/GlobalStyle";

import GetWeather from "../weather/GetWeather";
import Rank from "./Rank";
import MainImage from "../../assets/MainBackgroundImage.png";
import ArrowImg from "../../assets/arrow.png";
import { usePageMoving } from "../../components/usePageMoving";

const Home = () => {
  const { moveToSearch } = usePageMoving();
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
  background-image: url(${MainImage});
  background-repeat: no-repeat;
  background-size: cover;

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

  & > h1 {
    font-size: 50px;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  & > p {
    font-size: 20px;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
  }

  & > p > span {
    color: #ffee00;
    font-weight: bold;
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
