import styled from "styled-components";
import MateItem from "./MateItem";
import { CommonButton } from "../../../components/CommonButton";
import { usePageMoving } from "../../../components/usePageMoving";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../AppContext";
import { ReqMateBoardList } from "../../../apis/mateBoard";
import Loading from "../../../components/Loading";
import BackMove from "../../../components/backMove";
import LoginModal from "../../../components/LoginModal";

/* 메이트 게시판 List 컴포넌트 */
const MateList = () => {
  const { moveToWrite, moveToLogin } = usePageMoving();

  const appContext = useContext(AppContext);
  const [checkToken, setCheckToken] = useState(false);

  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 글 목록
  const [mateList, setMateList] = useState([]);

  const [pageData, setPageData] = useState("");

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);

  // 페이지
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    setIsLoading2(true)
    try {
      const response = await ReqMateBoardList(page + 1);
      if (response.data.content.length === 0) {
        setIsEmpty(true);
      } else {
        setMateList([...mateList, ...response.data.content]);
        setPageData(response.data)
        setPage(page + 1);
      }
      console.log(pageData)
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading2(false);
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

  // 글작성 click handler
  const writeBtnHandler = () => {
    if (!appContext.accessToken) {
      setCheckToken(!checkToken);
    } else {
      moveToWrite();
    }
  };

  useEffect(() => {
    async function getMateList() {
      try {
        const response = await ReqMateBoardList();
        console.log(response.data);
        setMateList(response.data.content);
      } catch (err) {
        if (err.response.data.statusCode === 404 || err.response.data.statusCode === 401) {
          setIsEmpty(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getMateList();
  }, []);

  return (
    <>
      <BackMove content={"홈으로"}/>
      <PageTitle>👬 세차 메이트 👬</PageTitle>
      <Button onClick={writeBtnHandler}>글쓰기</Button>
      <hr />
      {isLoading ? (
        <LoadDiv>
          <Loading />
        </LoadDiv>
      ) : (
        <AllMateListDiv>
          {isEmpty && <p>게시글을 찾을 수 없습니다.</p>}
          {mateList.map((list) => (
            <MateItem key={list.mbid} list={list} />
          ))}
        </AllMateListDiv>
      )}
      {checkToken && <LoginModal setCheckToken={setCheckToken} checkToken={checkToken} />}
      {isLoading2 && page != pageData.totalPageNo &&
        <LoadDiv>
          <Loading/>
        </LoadDiv>
      }
      {page === pageData.totalPageNo ? <br/> : <H4>더보기</H4>}
    </>
  );
};

export default MateList;

// 목록 전체 div
const AllMateListDiv = styled.div`
  width: 90vw;
  margin: auto;
`;

/* 페이지 종류 Style */
const PageTitle = styled.h2`
  margin-top: 3vh;
  margin-bottom: 1vh;
  text-align: center;
`;

/* 글작성 버튼 Style */
const Button = styled(CommonButton)`
  width: 20vw;
  font-size: 14px;
  margin-top: 1vh;
  margin-bottom: 1vh;
  margin-left: 75vw;
`;

/* h4 Style */
const H4 = styled.h4`
  text-align: center;
  margin-bottom: 2vh;
`;

const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
