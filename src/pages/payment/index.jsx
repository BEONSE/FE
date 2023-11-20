import GlobalStyle from "../../components/GlobalStyle";
import styled from "styled-components";
import React from "react";
import IterationPoint from "./IterationPoint";
import MyPoints from "../myPages/myPoints";
import PointStore from "../../assets/pointstore.png";
import BackMove from "../../components/backMove";

/* 포인트 충전 컴포넌트 */
const Payment = () => {
  return (
    <>
      <GlobalStyle />
      <BackMove />
      <PointAllDiv>
        <Title></Title>
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
  margin-left: 5vw;
  background-image: url(${PointStore});
  background-size: contain;
  width: 100vw;
  height: 130px;
`;

/* 보유 포인트 Style */
const CurrentPoint = styled.div`
  width: 90vw;
  margin-top: 2vh;

  & > hr {
    margin-top: 20px;
    margin-bottom: 60px;
  }
`;

/* 충전할 포인트 Style */
const IterationPoints = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
