import styled from "styled-components";
import BackMove from "../../../components/backMove";
import { CommonButton } from "../../../components/CommonButton";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ReviewWriteModal from "./ReviewWriteModal";
import { usePageMoving } from "../../../components/usePageMoving";
import { Warning } from "../../register/CommonRegister";

const ReviewWrite = () => {
  const { moveToMyCoupon } = usePageMoving();
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
  const [imageUrl, setImageUrl] = useState("");

  // 입력 유효성 검사
  const [titleCheck, setTitleCheck] = useState(0);
  const [contentCheck, setContentCheck] = useState(0);

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

    setWriteReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Image Handler 함수
  const onLoadImage = (e) => {
    const file = e.target.files;
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file[0]);
  };

  return (
    <>
      <BackMove movePage={moveToMyCoupon} content={"보유 쿠폰 조회"} />
      <PageTitle>리뷰 쓰기✍</PageTitle>

      <InputAllDiv>
        <hr />
        <InputGroup>
          <InputTitle type="text" name="bname" value={bname} disabled />
          <InputTitle
            type="text"
            name="title"
            placeholder="제목 (최소3~50글자)"
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
            placeholder="내용 (최소 10글자 이상 작성해주세요.)"
            name="content"
            minLength={10}
            maxLength={1000}
            required
            onChange={handleInput}
          />

          <input
            id="input-file"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onLoadImage}
            style={{ display: "none" }}
          />
          <PhotoBtn className="input-file-button" htmlFor="input-file">
            사진선택
          </PhotoBtn>
        </InputGroup>
        {contentCheck === 2 && (
          <Warning check={contentCheck}>최소 10글자 이상 작성해주세요.</Warning>
        )}
        {contentCheck === 1 && (
          <Warning check={contentCheck}>최대 입력 가능 글자 수를 초과하였습니다.</Warning>
        )}
        <ThumnailImage>{imageUrl && <img src={imageUrl} alt="Preview" />}</ThumnailImage>
        <Button
          onClick={() => {
            if (writeReview.title.trim() !== "" && writeReview.content.trim() !== "") {
              setClickBtn(true);
            }
          }}
        >
          등록하기
        </Button>
        {clickBtn && <ReviewWriteModal cid={cid} writeReview={writeReview} image={image} />}
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
  margin-bottom: 2vh;

  &:focus-within {
    outline: auto;
    outline-color: #68d0f3;
  }
`;

// 이미지 미리보기
const ThumnailImage = styled.div`
  width: 80%;

  & > img {
    width: 100%;
  }
`;

/* 등록 버튼 Style */
const Button = styled(CommonButton)`
  margin-top: 3vh;
  margin-bottom: 6vh;
  font-size: 17px;
`;

const PhotoBtn = styled.label`
  margin-left: 2vw;
  padding: 6px 25px;
  background-color: #36c036;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  width: 28vw;
`;
