import styled from "styled-components";

const BoardList = () => {
  return (
    <>
      <PageTitle>세차 메이트</PageTitle>
      <Button>글 작성</Button>
    </>
  );
};

export default BoardList;

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
  margin: -2vh 4vw 0 auto;
  padding-left: 4vw;
  padding-top: 1vh;
`;
