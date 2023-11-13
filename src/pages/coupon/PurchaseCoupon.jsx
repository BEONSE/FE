import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import { useState } from "react";

const PurchaseCoupon = () => {
  const [press, setPress] = useState(1);
  const [bubble, setBubble] = useState(1);

  // 수량 증가 handler
  const increasePressHandler = () => {
    setPress((prevCount) => (prevCount < 5 ? prevCount + 1 : prevCount));
  };

  const increaseBubbleHandler = () => {
    setBubble((prevCount) => (prevCount < 5 ? prevCount + 1 : prevCount));
  };
  // 수량 감소 handler
  const decreasePressHandler = () => {
    setPress((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  const decreaseBubbleHandler = () => {
    setBubble((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <>
      <CouponAllDiv>
        <h1>쿠폰 스토어</h1>
        <CouponItem>
          <div>
            <p>BEONSE</p>
            <p>XX점</p>
          </div>
          <h1>고압 샤워 쿠폰</h1>
          <p>3,000p</p>
        </CouponItem>
        <QuantityAllDiv>
          <Quantity>
            <p>
              <span onClick={decreasePressHandler}>- </span>
              <span> {press} </span>
              <span onClick={increasePressHandler}> +</span>
            </p>
          </Quantity>
          <PurchaseBtn>구 매</PurchaseBtn>
        </QuantityAllDiv>
        <CouponItem>
          <div>
            <p>BEONSE</p>
            <p>XX점</p>
          </div>
          <h1>폼 샤워 쿠폰</h1>
          <p>3,000p</p>
        </CouponItem>
        <QuantityAllDiv>
          <Quantity>
            <p>
              <span onClick={decreaseBubbleHandler}>- </span>
              <span> {bubble} </span>
              <span onClick={increaseBubbleHandler}> +</span>
            </p>
          </Quantity>
          <PurchaseBtn>구 매</PurchaseBtn>
        </QuantityAllDiv>
      </CouponAllDiv>
    </>
  );
};
export default PurchaseCoupon;

// StyledComponent

// 쿠폰 구매 전체 div
const CouponAllDiv = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    margin-top: 5vh;
    margin-bottom: 4vh;
  }
`;

// 쿠폰 정보
export const CouponItem = styled.div`
  width: 100%;

  background-color: #c1f5ff;

  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  padding: 30px;
  margin-bottom: 20px;

  & > div {
    display: flex;
    justify-content: space-between;

    & > p {
      margin-bottom: 20px;
      font-size: 23px;
    }
  }

  & > p {
    text-align: right;
    font-size: 20px;
    font-weight: bold;
  }
`;
// 구매 수량 & 구매 버튼 div
const QuantityAllDiv = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
`;

// 구매 수량 선택 div
const Quantity = styled.div`
  text-align: center;
  & > p {
    font-size: 20px;
    font-weight: bold;
    & > span {
      cursor: pointer;
    }
  }
`;

// 구매 버튼
const PurchaseBtn = styled(CommonButton)`
  margin-top: 1vh;
  margin-bottom: 2vh;
  width: 15vw;
`;