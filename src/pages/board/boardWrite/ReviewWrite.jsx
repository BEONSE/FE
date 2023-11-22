import styled from "styled-components";
import BackMove from "../../../components/backMove";
import { CommonButton } from "../../../components/CommonButton";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ReqReviewWrite } from "../../../apis/reviewBoard";

const ReviewWrite = () => {
  const [clickBtn, setClickBtn] = useState(false);
  const { cid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const bname = searchParams.get("bname");

  // 메이트 게시판 내용 state
  const [writeReview, setWriteReview] = useState({
    title: "",
    content: "",
  });

  // 이미지 정보
  const [image, setImage] = useState("");
  useEffect(() => {
    console.log(writeReview);
  }, [writeReview]);

  useEffect(() => {
    console.log("cid", cid);
    console.log(bname);
  }, [cid, bname]);

  // input handler 함수
  const handleInput = (e) => {
    const { name, value } = e.target;
    setWriteReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Image Handler 함수
  const onLoadImage = (e) => {
    const file = e.target.files;
    console.log(file);
    setImage(file);
  };

  // 등록하기 버튼
  const submitBtn = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image[0]);
      formData.append(
        "reviewBoardDTO",
        new Blob([JSON.stringify(writeReview)], { type: "application/json" }),
      );

      const writeResponse = await ReqReviewWrite(cid, formData);
      console.log(writeResponse);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <BackMove />
      <PageTitle>🙋‍♂️REVIEW 쓰기!🙋‍♀️</PageTitle>

      <InputAllDiv>
        <hr />
        <InputGroup>
          <InputTitle type="text" name="title" placeholder="제목" required onChange={handleInput} />
          <InputTitle type="text" name="bname" value={bname} disabled />

          <InputContent
            type="text"
            placeholder="내용"
            name="content"
            required
            onChange={handleInput}
          />

          <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={onLoadImage} />
        </InputGroup>
        <Button
          onClick={() => {
            submitBtn();
          }}
        >
          등록하기
        </Button>
        {/* {clickBtn && <BoardAddModal writeMate={writeReview} />} */}
      </InputAllDiv>
    </>
  );
};

export default ReviewWrite;

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
