import GlobalStyle from "../../components/GlobalStyle";
import styled from "styled-components";
import React from "react";
import IterationPoint from "./IterationPoint";

/* 포인트 충전 컴포넌트 */
const Payment = () => {
  return (
    <>
      <GlobalStyle />
      <Title>
        <h1>포인트 충전</h1>
      </Title>
      <CurrentPoint>
        <p>보유 포인트</p>
        <p>1,000p</p>
        <hr />
      </CurrentPoint>
      <IterationPoints>
        <IterationPoint price={1} />
        <IterationPoint price={3} />
        <IterationPoint price={5} />
      </IterationPoints>
    </>
  );
};

export default Payment;

/* 포인트 충전 Style */
const Title = styled.div`
  text-align: center;
  margin-top: 100px;
`;

/* 보유 포인트 Style */
const CurrentPoint = styled.div`
  text-align: right;
  margin: 50px 50px 0 0;

  & > hr {
    width: 100vw;
    margin-top: 30px;
    margin-bottom: 50px;
  }
`;

/* 충전할 포인트 Style */
const IterationPoints = styled.div`
  margin-bottom: 50px;
`;
