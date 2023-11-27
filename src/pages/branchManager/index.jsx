import { Route, Routes } from "react-router-dom";
import BranchUpdate from "./branchUpdate";
import React, { useEffect } from "react";
import BranchHome from "./BranchHome";

const BranchManager = ({ setHideHeaderFooter }) => {
  // Header Footer 숨기기
  useEffect(() => {
    setHideHeaderFooter(true);
    return () => setHideHeaderFooter(false);
  }, [setHideHeaderFooter]);

  return (
    <>
      <Routes>
        <Route path="/:bid" element={<BranchHome />} />
        <Route path="/mypage/:bid" element={<BranchUpdate />} />
      </Routes>
    </>
  );
};

export default BranchManager;
