import styled from "styled-components";

import React, { useEffect, useState } from "react";

import MyReview from "../myReview/index";
import MyMate from "./myMate/index";
import GlobalStyle from "../../../components/GlobalStyle";
import BackMove from "../../../components/backMove";

const MyBoard = () => {
  // 화면 이동

  // 내가 쓴 게시글, 메이트 게시글 클릭 상태
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    if (selectedType === null) {
      setSelectedType("myreview");
    }
  }, [selectedType]);

  return (
    <>
      <GlobalStyle />
      <BackMove content={"홈으로"} />
      <BoardAllDiv>
        <h1>내가 쓴 게시글</h1>
        <MyBoardType>
          <TypeItem
            selected={selectedType === "myreview"}
            onClick={() => setSelectedType("myreview")}
          >
            <span>리뷰 게시판</span>
            <hr />
          </TypeItem>
          <TypeItem selected={selectedType === "mymate"} onClick={() => setSelectedType("mymate")}>
            <span>메이트 게시판</span>
            <hr />
          </TypeItem>
        </MyBoardType>
        {selectedType === "myreview" ? <MyReview /> : <MyMate />}
      </BoardAllDiv>
    </>
  );
};

export default MyBoard;

export const BoardAllDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    margin-top: 2.5vh;
    margin-bottom: 2vh;
  }
`;

export const MyBoardType = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  margin-bottom: 2.5vh;
`;

const TypeItem = styled.div`
  cursor: pointer;

  width: 40vw;

  text-align: center;
  font-weight: ${({ selected }) => (selected ? "bold" : "null")};
  font-size: 20px;

  color: ${({ selected }) => (selected ? "black" : "#a5a4a4")}; // 선택되었을 때 색상 변경

  & > hr {
    border: 1px solid ${({ selected }) => (selected ? "black" : "#a5a4a4")};
  }
`;
