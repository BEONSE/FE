import GlobalStyle from "../../components/GlobalStyle";
import styled from "styled-components";
import React from "react";
import IterationPoint from "./IterationPoint";
import MyPoints from "../myPages/myPoints";

/* 포인트 충전 컴포넌트 */
const Payment = () => {
  return (
    <>
      <GlobalStyle />
      <PointAllDiv>
        <Title>
          <h1>💳 포인트 충전 💳</h1>
        </Title>
        <CurrentPoint>
          <MyPoints />
          <hr />
        </CurrentPoint>
        <IterationPoints>
          <IterationPoint price={1} />
          <IterationPoint price={3} />
          <IterationPoint price={5} />
        </IterationPoints>
      </PointAllDiv>
    </>
  );
};

export default Payment;

const PointAllDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

/* 포인트 충전 Style */
const Title = styled.div`
  text-align: center;
  margin-top: 4vh;
`;

/* 보유 포인트 Style */
const CurrentPoint = styled.div`
  text-align: right;
  margin-top: 30px;
  width: 90vw;
  & > h3 {
    margin-bottom: 1vh;
  }
  & > p {
    font-size: 20px;
  }

  & > hr {
    margin-top: 30px;
    margin-bottom: 50px;
  }
`;

/* 충전할 포인트 Style */
const IterationPoints = styled.div`
  width: 70vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
