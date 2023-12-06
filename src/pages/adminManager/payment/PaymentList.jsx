import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { ReqPayment } from "../../../apis/point";
import PaymentItem from "./PaymentItem";

const PaymentList = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentList, setPaymentList] = useState([]);
  // 페이지
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    try {
      const response = await ReqPayment(page + 1);
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
    async function getPayments() {
      try {
        const paymentResponse = await ReqPayment();
        setPaymentList(paymentResponse.data.content);
      } catch (err) {
        setIsEmpty(true);
      } finally {
        setIsLoading(false);
      }
    }
    getPayments();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadDiv>
          <Loading />
        </LoadDiv>
      ) : (
        <AllPaymentList>
          {isEmpty && <p>게시글을 찾을 수 없습니다.</p>}
          {paymentList.map((list) => (
            <PaymentItem key={list.mid} list={list} card={true} />
          ))}
        </AllPaymentList>
      )}
    </>
  );
};

export default PaymentList;

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
