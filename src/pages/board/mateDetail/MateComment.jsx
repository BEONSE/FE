import { styled } from "styled-components";
import PersonImg from "../../../assets/person.png";
import Menu from "../../../assets/kebab_menu.png";

const MateComment = () => {
  return (
    <>
      <H2>댓글</H2>
      <CommentGroup>
        <ProfileImage>
          <img src={PersonImg} />
        </ProfileImage>
        <Content>
          <ProfileContent>
            <h4>댓글 작성자</h4>
            <p>등급</p>
            <div>
              <img src={Menu} />
            </div>
          </ProfileContent>
          <Comment>
            <p>댓글을 달면 이런 배치가 되겠지요 댓글을 달면 이런 배치가 되겠지요</p>
            <Date>2023.12.10 15:00</Date>
          </Comment>
        </Content>
      </CommentGroup>
      <Hr />
      <CommentGroup>
        <ProfileImage>
          <img src={PersonImg} />
        </ProfileImage>
        <Content>
          <ProfileContent>
            <h4>댓글 작성자</h4>
            <p>등급</p>
            <div>
              <img src={Menu} />
            </div>
          </ProfileContent>
          <Comment>
            <p>댓글을 달면 이런 배치가 되겠지요</p>
            <Date>2023.12.10 15:00</Date>
          </Comment>
        </Content>
      </CommentGroup>
      <Hr />
    </>
  );
};

export default MateComment;

const H2 = styled.h2`
  margin-left: 7vw;
  margin-bottom: 3vh;
`;

const CommentGroup = styled.div`
  margin-left: 7vw;
  display: flex;
`;

const Content = styled.div`
  margin-left: 3vw;
`;

const ProfileImage = styled.div`
  margin-top: 3vh;
  width: 12vw;
  height: 8vh;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 70px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;

  & > p {
    margin-left: 5vw;
  }

  & > div {
    margin-left: auto;
  }
`;

const Comment = styled.div`
  width: 65vw;
  & > p {
    margin-bottom: 2vh;
  }
`;

const Date = styled.p`
  color: #aaaaaa;
`;

const Hr = styled.hr`
  width: 90vw;
  margin: 1vh auto 3vh auto;
`;
