import styled from "styled-components";

import SearchIcon from "../../assets/magnifier.png";
import BranchList from "./BrachList";

import { useState } from "react";
import BranchInfo, { KakaoMap } from "./BranchInfo";
import MultiMap from "../map/MultiMap";

const BranchReservation = () => {
  const [detailClick, setDetailClick] = useState(true);

  return (
    <>
      <SerachBranch>
        <h1>지점 검색</h1>
        <KakaoMap id="multimap">
          <MultiMap />
        </KakaoMap>
        <SearchBar>
          <input placeholder="지점 검색하기" />
          {/* 검색 누르고 input 태그 초기화 */}
          {/* focus 색상 & 전체 태그로 변경 */}
          <img
            src={SearchIcon}
            alt="SearchIconImage"
            onClick={() => {
              setDetailClick(true);
            }}
          />
        </SearchBar>
        <hr />
        {/* 검색 결과 없으면 없다고 띄우고, 이미지 클릭했을때 아래꺼 사라지는거 수정하기 */}
        {detailClick ? <BranchList setDetailClick={setDetailClick} /> : <BranchInfo />}
      </SerachBranch>
    </>
  );
};

export default BranchReservation;

//* StyledComponet */
// 지점 검색 바
const SearchBar = styled.div`
  width: 90vw;
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

const SerachBranch = styled.div`
  margin-top: 3vh;
  text-align: center;
  & > hr {
    outline: none;
    border: 1px solid #ececec;
    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-left: 3vw;
    margin-right: 3vw;
  }

  & > h1 {
    margin-bottom: 3vh;
  }
`;
