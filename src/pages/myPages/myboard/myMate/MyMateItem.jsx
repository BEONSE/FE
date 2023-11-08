import styled from "styled-components";
import { Link } from "react-router-dom";

const MyMateItem = () => {
  return (
    <>
      <MateGroup>
        <p>
          <Link to={"../../mate/1"}>제목 1</Link>
        </p>
        <p>지점</p>
        <p>2023.12.12</p>
        <Comment> 댓글 2</Comment>
      </MateGroup>
    </>
  );
};

export default MyMateItem;

/* 최상단 div Style */
const MateGroup = styled.div`
  width: 80%;
  height: 8vh;
  display: flex;
  margin: 0 3vw 0 3vw;
  justify-content: space-between;
  align-items: center;
`;

/* 댓글 div Style */
const Comment = styled.p`
  display: flex;
  width: 10vw;
  height: 5vh;
  text-align: center;
  background-color: #b6b6b6;
  align-items: center;
  justify-content: center;
`;
