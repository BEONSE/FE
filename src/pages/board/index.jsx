import { Route, Routes } from "react-router-dom";
import MateDetail from "./mateDetail";
import MateList from "./mateList";
import MateWrite from "./boardWrite/MateWrite";

const Board = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<MateList />} />
        <Route path="write" element={<MateWrite />} />
        <Route path=":id" element={<MateDetail />} />
      </Routes>
    </>
  );
};

export default Board;
