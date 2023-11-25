import styled from "styled-components";
import React from "react";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";
import Basic from "../../../assets/profile.jpg";

const ReviewItem = ({ review }) => {

  return (
    <>
      <ContentGroup>
        <Profile>
          <div>
            <InnerProf>
              {review.memberImageData ? (<img src={`data:image/png;base64,${review.memberImageData}`} alt="review" />) : (<img src={Basic} alt="기본 이미지" />)}

              <Writer>
                <p>{review.writer}</p>
                <Grade>
                  {review.grade === 1 && <img src={Grade1} alt="grade1" />}
                  {review.grade === 2 && <img src={Grade2} alt="grade2" />}
                  {review.grade === 3 && <img src={Grade3} alt="grade3" />}
                </Grade>
              </Writer>

            </InnerProf>
            <TimeDiv>
              <div>작성일 {review.createdAt}</div>
              <div>{review.createdAt !== review.modifiedAt && <div>수정일 {review.modifiedAt}</div>}</div>
            </TimeDiv>
          </div>
          <hr />
        </Profile>

        <Content>
          {review.reviewImageData && (
            <ReviewImage>
              <img src={`data:image/png;base64,${review.reviewImageData}`}  alt="profile" />
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
  margin-right: 5vw;
  margin-bottom: 3vh;
  
  & > div > div > img {
    width: 10vw;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const InnerProf = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
`;

const TimeDiv = styled.div`
  color: #aaaaaa;
  font-size: 13px;
  margin-top: 1vh;
  text-align: right;
  margin-bottom: 2vh;
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
  //margin-left: 2vw;

  & > img {
    height: 2.5vh;
  }
`;

const Writer = styled.div`
  margin-left: 2vw;
  display: flex;
  text-align: center;
`;
