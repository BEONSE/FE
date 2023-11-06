import { Route, Routes } from "react-router";
import MyReview from "./MyReview";
import MyMate from "./MyMate";

const MyBoard = () => {
  return (
    <>
      <p>내가 쓴 게시글 리뷰, 메이트</p>
      <Routes>
        <Route path="myreview" element={<MyReview />} />
        <Route path="mymate" element={<MyMate />} />
      </Routes>
    </>
  );
};

export default MyBoard;
