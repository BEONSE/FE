import React from "react";
import { Route, Routes } from "react-router-dom";
import ReviewWrite from "../boardWrite/ReviewWrite";
import ReviewBoard from "./ReviewBoard";
const ReviewList = () => {
  return (
    <>
      <Routes>
        <Route path="write/:cid" element={<ReviewWrite />} />
        <Route path="" element={<ReviewBoard />} />
      </Routes>
    </>
  );
};

export default ReviewList;
