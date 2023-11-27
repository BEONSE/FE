import { styled } from "styled-components";
import Menu from "../../../assets/kebab_menu.png";
import React, { useContext, useEffect, useState } from "react";
import CommentModal from "../CommentForm/CommentModal";
import AppContext from "../../../AppContext";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";
import Basic from "../../../assets/profile.jpg";

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
          {comment.imageData ? (<img src={`data:image/png;base64,${comment.imageData}`} alt="userprofile" />) : (
            <img src={Basic} alt="기본 이미지" />)}
        </ProfileImage>
        <Content>
          <ProfileContent>
            <h4>{comment.nickname}</h4>
            <p>
              {comment.grade === 1 && <img src={Grade1} alt="grade1" />}
              {comment.grade === 2 && <img src={Grade2} alt="grade2" />}
              {comment.grade === 3 && <img src={Grade3} alt="grade3" />}
            </p>
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
    width: 10vw;
    border-radius: 50px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    margin-left: 2vw;
    font-size: 13px;

    & > img {
      height: 2.5vh;
    }
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
