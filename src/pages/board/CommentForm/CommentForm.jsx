import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../AppContext";
import { ReqAddComment } from "../../../apis/mateBoard";

const CommentForm = ({ id }) => {
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
        <h4>{appContext.nickname}</h4>
        <form onSubmit={submitCommentBtn}>
          <InputForm placeholder="댓글을 남겨보세요!" onChange={textareaHandle} />
          <CommentBtn type="submit">등록</CommentBtn>
        </form>
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
const InputForm = styled.textarea`
  border: none;
  width: 100%;
  height: 6vh;
  margin-top: 1vh;

  font-size: 14px;
  font-family: "S-CoreDream-light", sans-serif;

  resize: none;
`;

const CommentBtn = styled.button`
  cursor: pointer;
  margin-left: 90%;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-family: "S-CoreDream-light", sans-serif;
`;
