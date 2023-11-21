import { Route, Routes } from "react-router-dom";
import BranchSearch from "./BranchSearch";
import BranchInfo from "./BranchInfo";

const BranchReservation = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<BranchSearch />} />
        <Route path=":bid" element={<BranchInfo />} />
      </Routes>
    </>
  );
};

export default BranchReservation;
