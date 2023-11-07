import styled from "styled-components";
import PersonImg from "../../../assets/person.png";

const MateDetailItem = () => {
  return (
    <>
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
          <p>
            예전 제주도 사장님도 친절하셨는데 바뀌신사장님도 직원들도 친절하고 설명도 잘해주고 단,
            손님이 많은것이 단점이라면 단점 걸레 삐는것도 정리잘되어있고 비누도 항상 잘비치
            되어있어요 걸레전용 짤순이도 있어요 그리고. 고압이 무었인지 보여주는 킹콩입니다 다른데는
            그냥 저압이라고 써놔야해요 ^^
          </p>
        </Content>
      </ContentGroup>
    </>
  );
};

export default MateDetailItem;

const ContentGroup = styled.div`
  border: 1px solid;
  margin: 3vh 5vw 3vh 5vw;
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
