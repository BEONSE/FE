import styled from "styled-components";

import MainImage from "../../assets/MainBackgroundImage.png";
import SearchIcon from "../../assets/magnifier.png";
import { ConmmonButton } from "../../components/CommonButton";
import GlobalStyle from "../../components/GlobalStyle";

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <MainDiv>
        <h1>BEONSE</h1>
        <p>
          <span>비온</span> 후에 <span>세</span>차하자
        </p>
      </MainDiv>
      <MainItems>
        <MainItem>날씨 추천 API</MainItem>
        <MainItem>이달의 세차왕</MainItem>
      </MainItems>
      <SearchBar>
        <input placeholder="지점 검색하기" />
        <img src={SearchIcon} alt="SearchIconImage" />
      </SearchBar>
      <ReservationDiv>
        <ResButton>예약하러가기</ResButton>
      </ReservationDiv>
    </>
  );
};

export default Home;

/* Styled Component*/
// 메인 화면 요소
const MainDiv = styled.div`
  @media (max-width: 1170px) {
    background-image: url(${MainImage});
    background-repeat: no-repeat;
    background-size: cover;

    width: 100vw;
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
    }
  }
`;

// 날씨 추천 & 이달의 세차왕
const MainItems = styled.div``;
const MainItem = styled.div`
  margin: auto;
  @media (max-width: 1170px) {
    width: 90%;
    height: 40%;
    background-color: #ffffff;
    padding: 45px;
    border-radius: 25px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    margin-bottom: 30px;
  }
`;

// 지점 검색 바
const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  border: 1px solid #a0a0a0;
  border-radius: 5px;
  padding: 8px;
  @media (max-width: 1170px) {
    width: 90vw;
    & > input {
      font-family: "S-CoreDream-light", sans-serif;
      font-size: 16px;

      width: 90%;
      height: 30px;

      border: none;
    }

    & > img {
      cursor: pointer;
      width: 30px;
    }
  }
`;

// 예약하러가기 div
const ReservationDiv = styled.div`
  text-align: center;
  & :hover {
    background-color: #6dc3d4;
  }
`;
// 예약하러가기 button
const ResButton = styled(ConmmonButton)`
  width: 90vw;
  background-color: #99e8f8;
`;

/* <a href="https://www.flaticon.com/kr/free-icons/" title="확대경 아이콘">확대경 아이콘  제작자: Freepik - Flaticon</a> */
