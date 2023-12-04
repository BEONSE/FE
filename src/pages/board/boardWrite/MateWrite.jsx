import styled from "styled-components";

import { CommonButton } from "../../../components/CommonButton";
import React, { useEffect, useState } from "react";
import BoardAddModal from "./BoardAddModal";
import BackMove from "../../../components/backMove";
import { ReqBranchNames } from "../../../apis/branch";
import { usePageMoving } from "../../../components/usePageMoving";
import { Warning } from "../../register/CommonRegister";

/* 메이트 작성 컴포넌트 */
const MateWrite = () => {
  const { moveToMate } = usePageMoving();
  const [clickBtn, setClickBtn] = useState(false);
  // 지점 배열
  const [branchNames, setBranchNames] = useState([]);

  // 입력 유효성 검사
  const [titleCheck, setTitleCheck] = useState(0);
  const [contentCheck, setContentCheck] = useState(0);
  const [branchCheck, setBranchCheck] = useState(false);
  // 메이트 게시판 내용 state
  const [writeMate, setWriteMate] = useState({
    title: "",
    branchName: "",
    content: "",
  });

  // input handler 함수
  const handleInput = (e) => {
    const { name, value } = e.target;
    let titleWarning = 0;
    let contentWarning = 0;

    switch (name) {
      case "title":
        titleWarning = value.length < 3 ? 2 : value.length > 50 ? 1 : 0;
        setTitleCheck(titleWarning);
        break;
      case "content":
        contentWarning = value.length < 10 ? 2 : value.length > 1000 ? 1 : 0;
        setContentCheck(contentWarning);
        break;
      default:
        break;
    }

    setWriteMate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(writeMate);
  }, [writeMate]);

  // 지점 선택 handler
  const selectedHandler = (e) => {
    setWriteMate((prevState) => ({
      ...prevState,
      branchName: e.target.value,
    }));
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
      <BackMove movePage={moveToMate} content={"메이트 게시판"} />
      <PageTitle>🙋‍♂️메이트 게시판🙋‍♀️</PageTitle>

      <InputAllDiv>
        <hr />

        <InputGroup>
          <SelectBox>
            <select onChange={selectedHandler} value={writeMate.branchName}>
              <option value={"defalut"}>지점 선택</option>
              {branchNames.map((name) => (
                <option value={`${name.branchName}`}>{name.branchName}</option>
              ))}
            </select>
          </SelectBox>
          {branchCheck && <Warning>지점을 선택해주세요.</Warning>}
          <InputTitle
            type="text"
            name="title"
            placeholder=" 제목 (최소 3~50 글자)"
            minLength={3}
            maxLength={50}
            required
            onChange={handleInput}
          />
          {titleCheck === 2 && <Warning check={titleCheck}>최소 3글자 이상 작성해주세요</Warning>}
          {titleCheck === 1 && (
            <Warning check={titleCheck}>최대 입력 가능 글자 수를 초과하였습니다.</Warning>
          )}

          <InputContent
            type="text"
            placeholder=" 내용 (최소 10글자 이상 작성해주세요.)"
            name="content"
            minLength={10}
            maxLength={1000}
            required
            onChange={handleInput}
          />
        </InputGroup>
        {contentCheck === 2 && (
          <Warning check={contentCheck}>최소 10글자 이상 작성해주세요.</Warning>
        )}
        {contentCheck === 1 && (
          <Warning check={contentCheck}>최대 입력 가능 글자 수를 초과하였습니다.</Warning>
        )}
        <Button
          onClick={() => {
            if (writeMate.branchName.length > 0) {
              console.log(writeMate);
              setClickBtn(true);
            } else {
              setBranchCheck(true);
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
