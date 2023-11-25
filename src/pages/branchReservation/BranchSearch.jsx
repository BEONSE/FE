import { useRef, useState } from "react";
import { ReqBranchSearch } from "../../apis/branch";
import { KakaoMap } from "./BranchInfo";
import SearchIcon from "../../assets/magnifier.png";
import MultiMap from "../map/MultiMap";
import styled from "styled-components";
import BranchList from "./BranchList";
import BackMove from "../../components/backMove";

const BranchSearch = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [searchResult, setSearchResult] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchRef = useRef();

  const [isBranchInfo, setIsBranchInfo] = useState([]);

  // 검색 입력 감지 handler
  const inputHandler = (e) => {
    setSearchKeyword(e.target.value);
    console.log(searchKeyword);
  };

  // 검색 입력 초기화
  const searchReset = () => {
    setSearchKeyword("");
  };

  // 키워드로 검색 요청하기
  const searchRequest = async () => {
    try {
      const searchResponse = await ReqBranchSearch(searchKeyword);
      console.log("프렌치 서치", searchResponse);
      if (searchResponse.status === 200) {
        setIsBranchInfo(searchResponse.data);
      }
      setSearchResult(false);
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        setSearchResult(true);
      }
    } finally {
      searchReset();
    }
  };
  return (
    <>
      <SerachBranch>
        <BackMove content={"홈으로"}/>
        <h1>지점 검색</h1>
        <KakaoMap id="multimap">
          <MultiMap />
        </KakaoMap>
        <SearchBar>
          <input
            ref={searchRef}
            onChange={inputHandler}
            placeholder="지점 검색하기"
            value={searchKeyword}
          />
          <img
            src={SearchIcon}
            alt="SearchIconImage"
            onClick={() => {
              searchRequest();
            }}
          />
        </SearchBar>
        <hr />
        <BranchList isBranchInfo={isBranchInfo} />
        {searchResult && <p>검색 결과가 없습니다.</p>}
      </SerachBranch>
    </>
  );
};

export default BranchSearch;

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
  &:focus-within {
    outline: auto;
    outline-color: #68d0f3;
  }

  @media (max-width: 1170px) {
    width: 90vw;
    & > input {
      font-family: "S-CoreDream-light", sans-serif;
      font-size: 16px;

      width: 90%;
      height: 30px;

      border: none;

      &:focus {
        outline: none;
      }
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
