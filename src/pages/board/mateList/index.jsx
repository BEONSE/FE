import styled from "styled-components";
import MateItem from "./MateItem";
import { Route, Routes, useNavigate } from "react-router";

/* 메이트 게시판 List 컴포넌트 */
const MateList = () => {
  const navigate = useNavigate();

  const moveToWrite = () => {
    navigate("/mate/write");
  };
  return (
    <>
      <PageTitle>세차 메이트</PageTitle>
      <Button onClick={moveToWrite}>글 작성</Button>
      <MateItem />
      <MateItem />
      <MateItem />
      <MateItem />
      <MateItem />
      <Hr />
      <H4>더보기</H4>
    </>
  );
};

export default MateList;

/* 페이지 종류 Style */
const PageTitle = styled.h2`
  margin-top: 5vh;
  text-align: center;
`;

/* 글작성 버튼 Style */
const Button = styled.button`
  width: 20vw;
  height: 4vh;
  border: 0;
  border-radius: 5px;
  background-color: #99e8f8;
  display: flex;
  margin: -2vh 4vw 2vh auto;
  padding-left: 4.5vw;
  padding-top: 0.7vh;
  font-weight: 800;
  font-size: 16px;
`;

/* hr Style */
const Hr = styled.hr`
  margin: 0 3vw 2vh 3vw;
`;

/* h4 Style */
const H4 = styled.h4`
  text-align: center;
  margin-bottom: 2vh;
`;
