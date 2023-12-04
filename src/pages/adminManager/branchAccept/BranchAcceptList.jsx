import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { ReqResultMember } from "../../../apis/auth";
import Loading from "../../../components/Loading";
import BranchAcceptItem from "./BranchAcceptItem";

const BranchAcceptList = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [memberList, setMemberList] = useState([]);
// 페이지
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    try {
      const response = await ReqResultMember(page + 1);
      if (response.data.content.length === 0) {
        setIsEmpty(true);
      } else {
        setMemberList([...memberList, ...response.data.content]);
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
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  }

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
    async function getResultMember() {
      try {
        const paymentResponse = await ReqResultMember();
        console.log(paymentResponse);
        setMemberList(paymentResponse.data.content);
      } catch (err) {
        console.log(err);
        setIsEmpty(true)
      } finally {
        setIsLoading(false)
      }
    }
    getResultMember();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadDiv>
          <Loading />
        </LoadDiv>
      ) : (
        <ResultMemberList>
          {isEmpty && <p>게시글을 찾을 수 없습니다.</p>}
          {memberList.map((list) => (
            <BranchAcceptItem key={list.mid} list={list} />
          ))}
        </ResultMemberList>
      )}
    </>
  );
};

export default BranchAcceptList;

// 목록 전체 div
const ResultMemberList = styled.div`
  width: 90vw;
  margin: auto;
`;

const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
