import styled from "styled-components";
import MyReviewItem from "./MyReviewItem";

const MyReview = () => {
  return (
    <>
      <MyReviewItem />
      <MyReviewItem />
      <MyReviewItem />
      <MyReviewItem />
      <MyReviewItem />

      <H4>더보기</H4>
    </>
  );
};

export default MyReview;


/* h4 Style */
const H4 = styled.h4`
  text-align: center;
  margin-bottom: 2vh;
`;
