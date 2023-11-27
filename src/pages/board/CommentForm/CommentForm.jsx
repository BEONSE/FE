import styled from "styled-components";
import { useContext, useState } from "react";
import AppContext from "../../../AppContext";
import { ReqAddComment } from "../../../apis/mateBoard";
import { usePageMoving } from "../../../components/usePageMoving";

const CommentForm = ({ id }) => {
  const { moveToLogin } = usePageMoving();

  const appContext = useContext(AppContext);

  const [isComment, setIsComment] = useState({
    content: "",
  });

  // 댓글 등록 버튼 눌렀을 때
  const submitCommentBtn = async (e) => {
    e.preventDefault();
    try {
      const commentResponse = await ReqAddComment(id, isComment);
      console.log(commentResponse);
      window.location.reload();
    } catch (err) {
      console.log("댓글 등록 버튼 에러", err);
    }
  };

  // 댓글 입력 감지 handler
  const textareaHandle = (e) => {
    setIsComment({ content: e.target.value });
  };

  return (
    <>
      <InputAllDiv>
        <h4>{appContext.nickname || "로그인 후 댓글을 달 수 있어요..."}</h4>
        {appContext.nickname ? (
          <form onSubmit={submitCommentBtn}>
            <InputForm
              maxLength={1000}
              minLength={1}
              placeholder="댓글을 남겨보세요!"
              onChange={textareaHandle}
            />
            <CommentBtn type="submit">등록</CommentBtn>
          </form>
        ) : (
          <NotLogin>
            <p>
              로그인을 하려면 <span onClick={moveToLogin}>여기</span>를 눌러주세요.
            </p>
          </NotLogin>
        )}
      </InputAllDiv>
    </>
  );
};

export default CommentForm;

const InputAllDiv = styled.div`
  border: 1px solid black;
  border-radius: 10px;

  padding: 4%;
  margin-bottom: 4vh;
`;

// 댓글 입력 창
const InputForm = styled.textarea`
  border: none;
  width: 100%;
  height: 6vh;
  margin-top: 1vh;

  font-size: 14px;
  font-family: "S-CoreDream-light", sans-serif;

  resize: none;
`;

// 등록 버튼
const CommentBtn = styled.button`
  cursor: pointer;
  margin-left: 90%;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-family: "S-CoreDream-light", sans-serif;
`;

// 로그인 안했을 경우
const NotLogin = styled.div`
  & > p {
    & > span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
