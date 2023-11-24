import styled from "styled-components";
import BackMove from "../../../components/backMove";
import React, { useEffect, useState } from "react";
import { ReqMyPayment } from "../../../apis/point";
import MyPaymentItem from "./MyPaymentItem";
import Loading from "../../../components/Loading";

const MyPayment = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [paymentList, setPaymentList] = useState([]);
// 페이지
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    try {
      const response = await ReqMyPayment(page + 1);
      if (response.data.content.length === 0) {
        setIsEmpty(true);
      } else {
        setPaymentList([...paymentList, ...response.data.content]);
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
    async function getMyPayment() {
      try {
        const paymentResponse = await ReqMyPayment();
        console.log(paymentResponse);
        setPaymentList(paymentResponse.data.content);
      } catch (err) {
        alert(err);
        setIsEmpty(true)
      } finally {
        setIsLoading(false)
      }
    }

    getMyPayment();
  }, []);
  return (
    <>
      <BackMove />
      <Title>
        <h2>결제 페이지</h2>
      </Title>
      {isLoading ? (
        <LoadDiv>
          <Loading />
        </LoadDiv>
      ) : (
        <AllPaymentList>
          {isEmpty && <p>결제 내역이 없습니다.</p>}
          {paymentList.map((list) => (
            <MyPaymentItem key={list.rbId} list={list} />
          ))}
        </AllPaymentList>
      )}
    </>
  );
};

export default MyPayment;

const Title = styled.div`
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 2vh;
`;

// 목록 전체 div
const AllPaymentList = styled.div`
  width: 90vw;
  margin: auto;
`;

const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
