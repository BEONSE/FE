import styled from "styled-components";
import PersonImg from "../../../assets/person.png";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../AppContext";
import { ReqReviewBoardList } from "../../../apis/reviewBoard";
import { useParams } from "react-router-dom";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";

const ReviewItem = () => {
  const bid = useParams("branchId");
  const page = useParams("page");

  const appContext = useContext(AppContext);

  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 글 목록
  const [reviewList, setReviewList] = useState([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getReviewList() {
      try {
        const response = await ReqReviewBoardList(1, 1);
        setReviewList(response.data.content);
        console.log(response.data);
        console.log(response.data.content);
      } catch (err) {
        if (err.response.data.statusCode === 404 || err.response.data.statusCode === 401) {
          setIsEmpty(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getReviewList();
  }, []);
  return (
    <>
      {/*private Long rbId; //고유 번호
      private int rnum;
      private Long memberMid;
      private Long branchBid;
      private Long couponCid;
      private String title;
      private String content;
      private String writer; //작성자
      private String branchName; //지점명
      private boolean status;
      private MultipartFile image;
      private String originalFileName;
      private String imageType;
      private byte[] imageData;
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
      private Timestamp createdAt;//작성일
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
      private Timestamp modifiedAt;//수정일*/}
      {!isEmpty &&

        reviewList.map((list, index) => (
          <ContentGroup key={index}>
            <Profile>
              <div>
                <InnerProf>
                  <img src={`data:image/png;base64,${list.memberImageData}`} />
                  <p>{list.writer}</p>
                  <Grade>
                    {list.grade === 1 && <img src={Grade1} alt="grade1" />}
                    {list.grade === 2 && <img src={Grade2} alt="grade2" />}
                    {list.grade === 3 && <img src={Grade3} alt="grade3" />}
                  </Grade>
                </InnerProf>
                <TimeDiv>
                  <p>작성일 {list.createdAt}</p>
                  <p>수정일 {list.modifiedAt}</p>
                </TimeDiv>
              </div>
            </Profile>
            <Content>
              {list.reviewImageData &&
                <ReviewImage>
                  <img src={`data:image/png;base64,${list.reviewImageData}`} />
                </ReviewImage>
              }
              <p>{list.content}</p>
            </Content>
          </ContentGroup>
        ))}
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