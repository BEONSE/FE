import styled from "styled-components";
import { CommonButton } from "../../../components/CommonButton";
import React, { useEffect } from "react";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";
import Sun from "../../../assets/sunnyborder.png";

const BranchReview = ({ item }) => {
  useEffect(() => {
    if (item) {
      console.log(item);
      console.log("t", item["writer"]);
    }
  }, [item]);
  return (
    <>
      {item && (
        <ReviewAllDiv>
          <ContentGroup>
            <Profile>
              <div>
                <InnerProf>
                  {item.memberImageData ? (<img src={`data:image/png;base64,${item.memberImageData}`} alt="review" />) : (<img src={Sun} alt="기본 이미지" />)}
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
                  <div>{item.createdAt !== item.modifiedAt && <div>수정일 {item.modifiedAt}</div>}</div>
                </TimeDiv>
              </div>
            </Profile>
            <Content>
              {item.reviewImageData && (
                <ReviewImage>
                  <img src={`data:image/png;base64,${item.reviewImageData}`} alt="리뷰 이미지" />
                </ReviewImage>
              )}
              <p>{item.content}</p>
            </Content>
          </ContentGroup>

          <LoginButtonDiv>
            {/* <LoginBtn onClick={moveToBranchReview}>목록</LoginBtn> */}
            {/* 이전 페이지로 돌아가기로 설정하면 내가 쓴 리뷰에서도 쓸 수 있을 거 같음 */}
          </LoginButtonDiv>
        </ReviewAllDiv>
      )}
    </>
  );
};

export default BranchReview;

export const ReviewAllDiv = styled.div`
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
`;

const ContentGroup = styled.div`
  border: 1px solid;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vh;
  width: 80vw;
`;

const Profile = styled.div`
  margin-top: 2vh;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vh;

  & > div > div > img {
    width: 8vw;
  }
`;

/* 페이지 종류 Style */
const PageTitle = styled.h2`
  margin-top: 2vh;
  text-align: center;
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

// 로그인 버튼 div
export const LoginButtonDiv = styled.div`
  width: 80%;
  margin-top: 40px;

  @media (min-width: 1171px) {
    width: 30%;
  }
`;
// 로그인 버튼
export const LoginBtn = styled(CommonButton)`
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 15px;
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

