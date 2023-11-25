import styled from "styled-components";
import MyMateItem from "./MyMateItem";
import React, { useEffect, useState } from "react";
import { ReqMyMate } from "../../../../apis/mateBoard";
import Loading from "../../../../components/Loading";

const MyMate = () => {
  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 글 목록
  const [mateList, setMateList] = useState([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // 페이지
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    try {
      const response = await ReqMyMate(page + 1);
      if (response.data.content.length === 0) {
        setIsEmpty(true);
      } else {
        setMateList([...mateList, ...response.data.content]);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading(false);
    }
  };

  const throttle = (func, delay) => {
    let inThrottle;
    return function() {
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
    const handleScrollThrottle = throttle(handleScroll, 50); // 쓸데없이 많은 이벤트 호출을 방지하기 위한 스크롤 쓰로틀링

    window.addEventListener("scroll", handleScrollThrottle);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, [handleScroll]);

  useEffect(() => {
    async function getMyMate() {
      try {
        const response = await ReqMyMate();
        console.log(response.data.content);
        setMateList(response.data.content);
      } catch (err) {
        if (err.response.data.statusCode === 404 || err.response.data.statusCode === 401) {
          setIsEmpty(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getMyMate();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadDiv>
          <Loading />
        </LoadDiv>
      ) : (
        <AllMyMate>
          {isEmpty && <p>게시글을 찾을 수 없습니다.</p>}
          {mateList.map((list) => (
            <MyMateItem key={list.mbid} list={list} />
          ))}
        </AllMyMate>
      )}
      <H4>더보기</H4>
    </>
  );
};

export default MyMate;

/* h4 Style */
const H4 = styled.h4`
  text-align: center;
  margin-bottom: 2vh;
`;

// 목록 전체 div
const AllMyMate = styled.div`
  width: 90vw;
  margin: auto;
`;

const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;