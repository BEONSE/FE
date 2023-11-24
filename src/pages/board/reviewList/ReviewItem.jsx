import styled from "styled-components";
import React from "react";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";

const ReviewItem = ({ review }) => {
  return (
    <>
      <ContentGroup>
        <Profile>
          <div>
            <InnerProf>
              <img src={`data:image/png;base64,${review.memberImageData}`} alt="review" />
              <p>{review.writer}</p>
              <Grade>
                {review.grade === 1 && <img src={Grade1} alt="grade1" />}
                {review.grade === 2 && <img src={Grade2} alt="grade2" />}
                {review.grade === 3 && <img src={Grade3} alt="grade3" />}
              </Grade>
            </InnerProf>
            <TimeDiv>
              <p>작성일 {review.createdAt}</p>
              <p>수정일 {review.modifiedAt}</p>
            </TimeDiv>
            <hr />
          </div>
        </Profile>
        <Content>
          {review.reviewImageData && (
            <ReviewImage>
              <img src={`data:image/png;base64,${review.reviewImageData}`} />
            </ReviewImage>
          )}
          <p>{review.content}</p>
        </Content>
      </ContentGroup>
    </>
  );
};

export default ReviewItem;

const ContentGroup = styled.div`
  border: 1px solid;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vh;
`;

const Profile = styled.div`
  margin-top: 2vh;
  margin-left: 5vw;
  margin-bottom: 3vh;

  & > div > div {
    display: flex;
  }

  & > div > div > img {
    width: 8vw;
    height: 5vh;
  }
`;

const InnerProf = styled.div`
  & > p {
    margin-left: 8vw;
  }
`;

const TimeDiv = styled.div`
  display: flex;
  margin-left: 8vw;
  margin-top: -1.5vh;
  color: #aaaaaa;
  font-size: 13px;
  justify-content: space-around;
`;

const Content = styled.div`
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vh;
`;

const ReviewImage = styled.div`
  width: 100%;
  margin-bottom: 3vh;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/* 등급 Style */
const Grade = styled.p`
  margin-left: 2vw;

  & > img {
    height: 2.5vh;
  }
`;
