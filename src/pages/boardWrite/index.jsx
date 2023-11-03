import styled from "styled-components";

/* 리뷰 작성 컴포넌트 */
const BoardWrite = () => {
  return (
    <>
      <PageTitle>리뷰 작성</PageTitle>
      <InputGroup>
        <InputTitle type="text" placeholder="제목" />
        <InputBranch type="text" readOnly defaultValue={"xx점"} />
        <InputContent type="text" placeholder="내용" />
      </InputGroup>
      <Button>등록하기</Button>
    </>
  );
};

export default BoardWrite;

/* 리뷰 제목 Style */
const PageTitle = styled.h2`
  margin: 5vh 0 5vh 0;
  text-align: center;
`;

/* Input div 그룹 Style */
const InputGroup = styled.div`
  margin-left: 5vw;
`;

/* 리뷰 제목 Style */
const InputTitle = styled.input`
  width: 90vw;
  height: 5vh;
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: #d4d4d4;
  font-size: 16px;
  margin-bottom: 1vh;
  padding-left: 2vw;
`;

/* 리뷰 지점명 Style */
const InputBranch = styled.input`
  width: 90vw;
  height: 5vh;
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: #d4d4d4;
  font-size: 16px;
  margin-bottom: 1vh;
  padding-left: 2vw;
`;

/* 리뷰 내용 Style */
const InputContent = styled.textarea`
  width: 90vw;
  height: 30vh;
  display: flex;
  border: none;
  border-radius: 5px;
  background-color: #d4d4d4;
  font-size: 16px;
  margin-bottom: 1vh;
  padding-left: 2vw;
  padding-top: 1vh;
`;

/* 등록 버튼 Style */
const Button = styled.button`
  width: 90vw;
  height: 3.5vh;
  border: none;
  border-radius: 5px;
  background-color: #56c7eb;
  margin-left: 5vw;
  margin-bottom: 1vh;
`;
