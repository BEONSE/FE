import { styled } from "styled-components";
import PersonImg from "../../../assets/person.png";
import Menu from "../../../assets/kebab_menu.png";
import { useContext, useEffect, useState } from "react";
import CommentModal from "../CommentForm/CommentModal";
import AppContext from "../../../AppContext";

const MateComment = ({ comment, boardWriter }) => {
  // 케밥 이미지 클릭 상태
  const [clickKebob, setClickKebob] = useState(false);
  // 내가 작성한 댓글 상태
  const [isMyComment, setIsMyComment] = useState(false);
  // 게시자가 작성한 댓글 상태
  const [isWriter, setIsWriter] = useState(false);

  // 케밥 이미지 클릭 시 팝업 메뉴 열기
  const toggleMenu = () => {
    setClickKebob(!clickKebob);
  };

  const appContext = useContext(AppContext);

  // 댓글을 작성한 본인일 경우에만 케밥 출력
  const myComment = () => {
    if (appContext.nickname === comment.nickname) {
      setIsMyComment(true);
    }
  };

  // 게시글 작성자가 작성한 댓글일 경우 작성자 타이틀 달아주기
  const writerComment = () => {
    if (boardWriter === comment.nickname) {
      setIsWriter(true);
    }
  };
  useEffect(() => {
    myComment();
    writerComment();
  });

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
            {clickKebob && (
              <CommentModal
                mcid={comment.mcid}
                mateBoardMbid={comment.mateBoardMbid}
                toggleMenu={toggleMenu}
                clickKebob={clickKebob}
              />
            )}
            {isWriter && <Writer>작성자</Writer>}
            <div onClick={toggleMenu}>{isMyComment && <img src={Menu} alt="kebabicon" />}</div>
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
  height: 6vh;

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
  font-size: 13px;
`;

const Hr = styled.hr`
  width: 90vw;
  margin: 1vh auto 3vh auto;
`;

const Writer = styled.p`
  background-color: #99e8f8;
  /* background-color: #ffee00; */
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;

  font-weight: bold;

  border-radius: 10px;
`;
