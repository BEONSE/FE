import styled from "styled-components";
import PersonImg from "../../../assets/person.png";

import { useNavigate } from "react-router";
import { CommonButton } from "../../../components/CommonButton";
import BackMove from "../../../components/backMove";

const Item = () => {
  const navigate = useNavigate();

  const moveToBranchReview = () => {
    navigate("/branch/review");
  };

  return (
    <>
      <BackMove />
      <PageTitle>상세보기</PageTitle>
      <br />
      <ReviewAllDiv>
        <ContentGroup>
          <Profile>
            <div>
              <InnerProf>
                <img src={PersonImg} />
                <p>닉네임</p>
                <p>등급</p>
              </InnerProf>
              <TimeDiv>
                <p>작성일 2023/11/06</p>
                <p>수정일 2023/11/06</p>
              </TimeDiv>
            </div>
          </Profile>
          <Content>
            <ReviewImage>사진</ReviewImage>
            <p>
              예전 제주도 사장님도 친절하셨는데 바뀌신사장님도 직원들도 친절하고 설명도 잘해주고 단,
              손님이 많은것이 단점이라면 단점 걸레 삐는것도 정리잘되어있고 비누도 항상 잘비치
              되어있어요 걸레전용 짤순이도 있어요 그리고. 고압이 무었인지 보여주는 킹콩입니다
              다른데는 그냥 저압이라고 써놔야해요 ^^
            </p>
          </Content>
        </ContentGroup>

        <LoginButtonDiv>
          <LoginBtn onClick={moveToBranchReview}>목록</LoginBtn>
          {/* 이전 페이지로 돌아가기로 설정하면 내가 쓴 리뷰에서도 쓸 수 있을 거 같음음 */}
        </LoginButtonDiv>
      </ReviewAllDiv>
      <br />
    </>
  );
};

export default Item;

export const ReviewAllDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

/* 페이지 종류 Style */
const PageTitle = styled.h2`
  margin-top: 2vh;
  text-align: center;
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
  height: 30vh;
  background-color: gray;
  padding: 14vh 0 14vh 40vw;
  margin-bottom: 3vh;
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
