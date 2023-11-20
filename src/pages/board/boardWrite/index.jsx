import styled from "styled-components";

import { CommonButton } from "../../../components/CommonButton";
import React, { useState } from "react";
import BoardAddModal from "./BoardAddModal";
import BackMove from "../../../components/backMove";

/* 메이트 작성 컴포넌트 */
const BoardWrite = () => {
  const [clickBtn, setClickBtn] = useState(false);
  // 지점 배열
  const selectList = [
    { value: "defalut", name: "지점을 선택해주세요" },
    { value: "가산디지털단지점", name: "BESONSE 가산디지털단지점" },
    { value: "암사점", name: "BESONSE 암사점" },
    { value: "김포점", name: "BESONSE 김포점" },
    { value: "온수점", name: "BESONSE 온수점" },
    { value: "올림픽공원역점", name: "BESONSE 올림픽공원역점" },
    { value: "가산디지털단지2점", name: "BESONSE 가산디지털단지2점" },
    { value: "가산디지털단지3점", name: "BESONSE 가산디지털단지3점" },
  ];
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

  // select handler 함수
  const handleSelectChange = (e) => {
    const selectedBranchName = e.target.value;
    setWriteMate((prevState) => ({
      ...prevState,
      branchName: selectedBranchName,
    }));
  };

  return (
    <>
      <BackMove />
      <PageTitle>🙋‍♂️MATE 게시판🙋‍♀️</PageTitle>

      <InputAllDiv>
        <hr />
        <InputGroup>
          <InputTitle type="text" name="title" placeholder="제목" required onChange={handleInput} />
          <SelectBranch type="text" name="brabchName" required onChange={handleSelectChange}>
            {selectList.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </SelectBranch>
          <InputContent
            type="text"
            placeholder="내용"
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

export default BoardWrite;

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
const SelectBranch = styled.select`
  font-family: "S-CoreDream-medium", sans-serif;
  padding: 1%;
  font-size: 20px;
  margin-bottom: 1vh;
  option {
    background-color: #ffffff;
  }
  option:checked {
    background-color: lightblue;
  }
  &:focus-within {
    outline: auto;
    outline-color: #68d0f3;
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
