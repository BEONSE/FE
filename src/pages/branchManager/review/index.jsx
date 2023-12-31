import styled from "styled-components";
import React from "react";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";
import Basic from "../../../assets/profile.jpg";

const BranchReview = ({ item }) => {
  return (
    <>
      {item && (
        <ReviewAllDiv>
          <Profile>
            <div>
              <InnerProf>
                {item.memberImageData ? (
                  <img src={`data:image/png;base64,${item.memberImageData}`} alt="review" />
                ) : (
                  <img src={Basic} alt="기본 이미지" />
                )}
                <Writer>
                  <p>{item.writer}</p>
                  <Grade>
                    {item.grade === 1 && <img src={Grade1} alt="grade1" />}
                    {item.grade === 2 && <img src={Grade2} alt="grade2" />}
                    {item.grade === 3 && <img src={Grade3} alt="grade3" />}
                  </Grade>
                </Writer>
              </InnerProf>
              <TimeDiv>
                <div>작성일 {item.createdAt}</div>
                <div>
                  {item.createdAt !== item.modifiedAt && <div>수정일 {item.modifiedAt}</div>}
                </div>
              </TimeDiv>
            </div>
            <hr />
          </Profile>
          <Content>
            {item.reviewImageData && (
              <ReviewImage>
                <img src={`data:image/png;base64,${item.reviewImageData}`} alt="리뷰 이미지" />
              </ReviewImage>
            )}
            <p>{item.content}</p>
          </Content>
        </ReviewAllDiv>
      )}
    </>
  );
};

export default BranchReview;

export const ReviewAllDiv = styled.div`
  margin-left: 5vw;
  margin-right: 5vw;
  width: 80vw;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-bottom: 3vh;
`;

const Profile = styled.div`
  margin-top: 2vh;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vh;

  & > div > div > img {
    width: 8vw;
    border-radius: 50%;
    margin-right: 2vw;
  }
`;

const InnerProf = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1vw;
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
  margin-left: 2vw;
  & > img {
    height: 2.5vh;
  }
`;

const Writer = styled.div`
  margin-left: 2vw;
  display: flex;
  text-align: center;
`;
