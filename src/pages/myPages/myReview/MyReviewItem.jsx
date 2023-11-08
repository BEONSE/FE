import styled from "styled-components";
import { Link } from "react-router-dom";

const MyReviewItem = () => {
  return (
    <>
      <MateGroup>
        <p>
          <Link to={"../../reviewitem"}>제목 1</Link>
        </p>
        <p>지점</p>
        <p>2023.12.12</p>
      </MateGroup>
    </>
  );
};

export default MyReviewItem;

/* 최상단 div Style */
const MateGroup = styled.div`
  width: 80%;
  height: 8vh;
  display: flex;
  margin: 0 3vw 0 3vw;
  justify-content: space-between;
  align-items: center;
`;
