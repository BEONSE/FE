import styled from "styled-components";
import React, { useState } from "react";
import MyReviewDetail from "./MyReviewDetail";

const MyReviewItem = ({ list }) => {
  const [press, setPress] = useState(); // 고압 쿠폰 선택 수량
  const [modalOpen, setModalOpen] = useState(false);

  // 리뷰 클릭
  const selectDiv = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <ReviewGroup
        onClick={selectDiv}
      >
        <LeftInfo>
          <ReviewContent>
            <div>
              <p>{list.branchName}</p>
              <h2>{list.title}</h2>
            </div>
            <Content>
              <h4>{list.content}</h4>
              <p>{list.modifiedAt}</p>
            </Content>
          </ReviewContent>
          <ImageDiv>
            {list.reviewImageData &&
              <Image src={`data:image/png;base64,${list.reviewImageData}`} />
            }
          </ImageDiv>
        </LeftInfo>
      </ReviewGroup>
      {modalOpen && <MyReviewDetail
        data={list}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        setPress={setPress}
      />}
      <hr />
    </>
  );
};

export default MyReviewItem;

/* 최상단 div Style */
const ReviewGroup = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  margin-bottom: 1vh;

  padding-left: 2vw;
  padding-right: 2vw;

  & > div {
    display: flex;
  }
`;

const LeftInfo = styled.div`
  display: flex;
  margin-bottom: 1vh;
`;

/* 세부 내용 Style */
const ReviewContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;

  & > div > h2 {
    margin-bottom: 1vh;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //margin-top: 5vh;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vh;

  & > h4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 1vh;
  }
`;

/* 날짜 Style */
const Date = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  color: #8f8f8f;
`;

/* 댓글 div Style */
const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 15vw;
  text-align: center;
  margin-left: auto;

  font-size: 14px;
`;


/* 댓글 개수 Style */
const Image = styled.img`
  height: 70%;
  width: 100%;
`;