import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import BranchInfo from "./BranchInfo";
import BranchReserve from "./BranchReserve";
import SearchIcon from "../../assets/magnifier.png";
import BranchList from "./BrachList";

const BranchReservation = () => {
  return (
    <>
      <SearchBar>
        <input placeholder="지점 검색하기" />
        <img src={SearchIcon} alt="SearchIconImage" />
      </SearchBar>
      <hr />
      <BranchList />

      <Routes>
        <Route path="info" element={<BranchInfo />} />
        <Route path="reservation" element={<BranchReserve />} />
      </Routes>
    </>
  );
};

export default BranchReservation;

//* StyledComponet */
// 지점 검색 바
const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  border: 1px solid #a0a0a0;
  border-radius: 5px;
  padding: 8px;
  @media (max-width: 1170px) {
    width: 90vw;
    & > input {
      font-family: "S-CoreDream-light", sans-serif;
      font-size: 16px;

      width: 90%;
      height: 30px;

      border: none;
    }

    & > img {
      cursor: pointer;
      width: 30px;
    }
  }
`;
