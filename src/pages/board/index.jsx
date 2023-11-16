import { Route, Routes } from "react-router-dom";
import BoardWrite from "./boardWrite";
import MateDetail from "./mateDetail";
import MateList from "./mateList";

const Board = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<MateList />} />
        <Route path="write" element={<BoardWrite />} />
        <Route path=":id" element={<MateDetail />} />
      </Routes>
    </>
  );
};

export default Board;
