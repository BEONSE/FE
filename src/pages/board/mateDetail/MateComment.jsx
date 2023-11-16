import { styled } from "styled-components";
import PersonImg from "../../../assets/person.png";
import Menu from "../../../assets/kebab_menu.png";
import { useState } from "react";
import CommentModal from "../CommentForm/CommentModal";

const MateComment = ({ comment }) => {
  // 케밥 이미지 클릭 상태
  const [clickKebob, setClickKebob] = useState(false);

  // 케밥 이미지 클릭 시 팝업 메뉴 열기
  const toggleMenu = () => {
    setClickKebob(!clickKebob);
  };

  return (
    <>
      <CommentGroup>
        <ProfileImage>
          <img src={PersonImg} alt="commentProfile" />
        </ProfileImage>
        <Content>
          <ProfileContent>
            <h4>{comment.nickname}</h4>
            <p>등급</p>
            {clickKebob && <CommentModal />}
            <div onClick={toggleMenu}>
              <img src={Menu} alt="kebabicon" />
            </div>
          </ProfileContent>
          <Comment>
            <p>{comment.content}</p>
            <Date>{comment.createdAt}</Date>
          </Comment>
        </Content>
      </CommentGroup>

      <Hr />
    </>
  );
};

export default MateComment;

const CommentGroup = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: 80%;
  margin-left: 3vw;
`;

const ProfileImage = styled.div`
  margin-top: 0;
  height: 8vh;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 70px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    margin-left: 2vw;
    font-size: 13px;
  }
  & > div {
    margin-left: auto; /* div를 가장 오른쪽으로 이동 */
    & > img {
      cursor: pointer;
    }
  }
`;

const Comment = styled.div`
  width: 100%;
  & > p {
    margin-bottom: 1vh;
  }
`;

const Date = styled.p`
  color: #aaaaaa;
`;

const Hr = styled.hr`
  width: 90vw;
  margin: 1vh auto 3vh auto;
`;
