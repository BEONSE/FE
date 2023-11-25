import styled from "styled-components";

import { CommonButton } from "../../../components/CommonButton";
import React, { useEffect, useState } from "react";
import BoardAddModal from "./BoardAddModal";
import BackMove from "../../../components/backMove";
import { ReqBranchNames } from "../../../apis/branch";
import { usePageMoving } from "../../../components/usePageMoving";

/* 메이트 작성 컴포넌트 */
const MateWrite = () => {

  const {moveToMate} = usePageMoving();
  const [clickBtn, setClickBtn] = useState(false);
  // 지점 배열
  const [branchNames, setBranchNames] = useState([]);

  // 메이트 게시판 내용 state
  const [writeMate, setWriteMate] = useState({
    title: "",
    branchName: "",
    content: "",
  });

  // input handler 함수
  const handleInput = (e) => {
    const { name, value } = e.target;
    setWriteMate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 지점 선택 handler
  const selectedHandler = (e) => {
    setWriteMate({ branchName: e.target.value });
  };

  // 지점 이름 가져오기
  useEffect(() => {
    async function getBranchNames() {
      try {
        const namesResponse = await ReqBranchNames();
        console.log("이름", namesResponse);
        if (namesResponse.status === 200) {
          setBranchNames(namesResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBranchNames();
  }, []);

  return (
    <>
      <BackMove movePage={moveToMate} content={"메이트 게시판"}/>
      <PageTitle>🙋‍♂️MATE 게시판🙋‍♀️</PageTitle>

      <InputAllDiv>
        <hr />
        <InputGroup>
          <InputTitle
            type="text"
            name="title"
            placeholder=" 제목"
            required
            onChange={handleInput}
          />
          <SelectBox>
            <select onChange={selectedHandler} value={writeMate.branchName}>
              <option value={"defalut"}>지점 선택</option>
              {branchNames.map((name) => (
                <option value={`${name.branchName}`}>{name.branchName}</option>
              ))}
            </select>
          </SelectBox>
          <InputContent
            type="text"
            placeholder=" 내용"
            name="content"
            required
            onChange={handleInput}
          />
        </InputGroup>
        <Button
          onClick={() => {
            if (
              writeMate.title.trim() !== "" &&
              writeMate.branchName.trim() !== "" &&
              writeMate.content.trim() !== ""
            ) {
              setClickBtn(true);
            }
          }}
        >
          등록하기
        </Button>
        {clickBtn && <BoardAddModal writeMate={writeMate} />}
      </InputAllDiv>
    </>
  );
};

export default MateWrite;

// 입력 폼 전체 DIV
const InputAllDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: auto;
`;

/* 페이지 종류 Style */
const PageTitle = styled.h2`
  margin-top: 2vh;
  margin-bottom: 2vh;
  text-align: center;
`;

/* Input div 그룹 Style */
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
`;

/* 제목 Style */
const InputTitle = styled.input`
  font-family: "S-CoreDream-medium", sans-serif;
  padding: 1%;
  font-size: 20px;
  margin-bottom: 1vh;

  &:focus-within {
    outline: auto;
    outline-color: #68d0f3;
  }
`;

/* 지점명 Style */
const SelectBox = styled.div`
  & > select {
    font-family: "S-CoreDream-light";
    font-weight: bold;
    padding: 2%;
    width: 100%;
    font-size: 19px;
    margin-bottom: 1vh;
    & :focus {
      outline: none;
      border: 1px solid #99eeff;
    }
  }
`;

/* 내용 Style */
const InputContent = styled.textarea`
  font-family: "S-CoreDream-medium", sans-serif;
  padding: 1%;
  height: 40vh;
  font-size: 20px;
  resize: none;

  &:focus-within {
    outline: auto;
    outline-color: #68d0f3;
  }
`;

/* 등록 버튼 Style */
const Button = styled(CommonButton)`
  margin-top: 3vh;
  margin-bottom: 6vh;
  font-size: 17px;
`;
