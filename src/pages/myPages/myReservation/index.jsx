import styled from "styled-components";
import BackMove from "../../../components/backMove";
import React, { useEffect, useState } from "react";
import { ReqMyReservation } from "../../../apis/reservation";
import ReservationItem from "./ReservationItem";
import Loading from "../../../components/Loading";
import { usePageMoving } from "../../../components/usePageMoving";

const MyReservation = () => {

  const {moveToSearch} = usePageMoving();
  const [resList, setResList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);

  //페이지
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState("");
  const loadMore = async () => {
    setIsLoading2(true);
    try {
      const response = await ReqMyReservation(page + 1);
      if (response.data.content.length === 0) {
        setIsEmpty(true);
      } else {
        setResList([...resList, ...response.data.content]);
        console.log(response.data);
        setPageData(response.data);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading2(false);
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
    async function getReservation() {
      try {
        const reserveResponse = await ReqMyReservation();
        console.log(reserveResponse);
        if (reserveResponse.status === 200) {
          setResList(reserveResponse.data.content);
        }
      } catch (err) {
        console.log(err);
        setIsEmpty(true);
      } finally {
        setIsLoading(false);
      }
    }

    getReservation();
  }, []);

  return (
    <>
      <BackMove movePage={moveToSearch} content={"지점 검색"}/>
      <Title>예약 현황</Title>
      {isLoading &&
        <LoadDiv>
          <Loading />
        </LoadDiv>
      }
      {resList && resList.map((list) => <ReservationItem key={list.rvid} list={list} />)}
      {isLoading2 && page != pageData.totalPageNo &&
        <LoadDiv>
          <Loading />
        </LoadDiv>
      }
    </>
  );
};

export default MyReservation;

const Title = styled.h2`
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;
const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;