import ReviewItem from "./ReviewItem";
import BackMove from "../../../components/backMove";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { ReqBranchNames } from "../../../apis/branch";
import { ReqReviewBoardList } from "../../../apis/reviewBoard";
import Loading from "../../../components/Loading";

const ReviewBoard = () => {
  const [branchNames, setBranchNames] = useState([]);
  const [selectBranch, setSelectBranch] = useState({
    branchName: "",
  });

  const [isLoad, setIsLoad] = useState(false);
  const [isLoad2, setIsLoad2] = useState(false);
  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 글 목록
  const [reviewList, setReviewList] = useState([]);
  const [pageData, setPageData] = useState("")

  // 지점 선택 handler
  const selectedHandler = (e) => {
    setSelectBranch({ branchName: e.target.value });
  };

  // 페이지
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    setIsLoad2(true)
    try {
      const response = await ReqReviewBoardList(selectBranch.branchName, page + 1);
      if (response.data.content.length === 0) {
        setIsEmpty(true);
      } else {
        setReviewList([...reviewList, ...response.data.content]);
        setPageData(response.data)
        setPage(page + 1);
      }
      console.log(pageData)
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoad2(false);
    }
  };

  const throttle = (func, delay) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // 스크롤이 맨 아래에 도달하면 새로운 데이터 로드
      loadMore();
    }
  };

  useEffect(() => {
    const handleScrollThrottle = throttle(handleScroll, 20); // 쓸데없이 많은 이벤트 호출을 방지하기 위한 스크롤 쓰로틀링

    window.addEventListener("scroll", handleScrollThrottle);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, [handleScroll]);

  useEffect(() => {
    console.log(selectBranch.branchName);
  }, [selectBranch]);

  // 지점 이름 가져오기
  useEffect(() => {
    async function getBranchNames() {
      try {
        const namesResponse = await ReqBranchNames();
        console.log("이름", namesResponse);
        if (namesResponse.status === 200) {
          setBranchNames(namesResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBranchNames();
  }, []);

  useEffect(() => {
    if (selectBranch.branchName !== "") {
      getReviewList();
    }
  }, [selectBranch]);

  const getReviewList = async () => {
    setIsLoad(true);
    try {
      const response = await ReqReviewBoardList(selectBranch.branchName);
      setReviewList(response.data.content);
      console.log(response.data);
      console.log(response.data.content);
    } catch (err) {
      console.log(err);
      if (err.response.data.statusCode === 404 || err.response.data.statusCode === 401) {
        setIsEmpty(true);
      }
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <>
      <BackMove />
      <Title>
        <h1>REVIEW</h1>
      </Title>
      <SelectBox>
        <select onChange={selectedHandler} value={selectBranch.branchName}>
          <option value={"defalut"}>지점 선택</option>
          {branchNames.map((name) => (
            <option value={`${name.bid}`}>{name.branchName}</option>
          ))}
        </select>
      </SelectBox>
      {isEmpty && <p>리뷰가 없습니다.</p>}
      {isLoad ? (
        <Load>
          <Loading />
          <p>리뷰 불러오는 중...</p>
        </Load>
      ) : (
        reviewList.map((review) => <ReviewItem review={review} key={review.rbId} />)
      )}
      {isLoad2 && page != pageData.totalPageNo &&
        <Load>
          <Loading />
          <p>리뷰 불러오는 중...</p>
        </Load>
      }
    </>
  );
};

export default ReviewBoard;

const Title = styled.div`
  text-align: center;
  margin-top: 4vh;
  margin-bottom: 3vh;
`;

// 셀렉트
const SelectBox = styled.div`
  width: 90vw;
  margin-bottom: 3vh;
  & > select {
    margin-left: 55%;
    font-family: "S-CoreDream-light";
    font-weight: bold;
    padding: 2%;
    width: 50%;
  }
`;

const Load = styled.div`
  text-align: center;
`;
