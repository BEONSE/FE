import styled from "styled-components";
import MyMateItem from "./MyMateItem";

const MyMate = () => {
  return (
    <>
      <PageTitle>내가 쓴 세차 메이트 글</PageTitle>
      <ButtonDiv>
        <Button>글 작성</Button>
      </ButtonDiv>

      <MyMateItem />
      <MyMateItem />
      <MyMateItem />
      <MyMateItem />
      <MyMateItem />
      <H4>더보기</H4>
    </>
  );
};

export default MyMate;

/* 페이지 종류 Style */
const PageTitle = styled.h2`
  margin-top: 2vh;
  text-align: center;
`;

/* 버튼 정렬  */
const ButtonDiv = styled.div`
  margin-left: 60%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

/* 글작성 버튼 Style */
const Button = styled.button`
  text-align: center;
  width: 20vw;
  height: 4vh;
  border: 0;
  border-radius: 5px;
  background-color: #99e8f8;
  font-weight: bold;
`;

// /* hr Style */
// const Hr = styled.hr`
//   margin: 0 3vw 2vh 3vw;
//   color: black;
// `;

/* h4 Style */
const H4 = styled.h4`
  text-align: center;
  margin-bottom: 2vh;
`;
