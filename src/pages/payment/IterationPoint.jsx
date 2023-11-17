import styled from "styled-components";
import PayModal from "./PayModal";
import { useState } from "react";
import { CommonButton } from "../../components/CommonButton";

/* 결제 종류 컴포넌트 */
const IterationPoint = ({ price }) => {
  const [isPayModal, setPayModal] = useState(false);

  const calcPoint = price * 11000;
  const calcPrice = price * 10000;

  const formattedPoint = calcPoint.toLocaleString();
  const formattedPrice = calcPrice.toLocaleString();

  const openPay = () => {
    setPayModal(true);
  };

  const closePay = () => {
    setPayModal(false);
  };

  return (
    <>
      <Points onClick={openPay} price={price}>
        <h1>{formattedPoint}p</h1>
        <p>{price}만원</p>
      </Points>
      {isPayModal && (
        <PayModal clicked={closePay} formattedPrice={formattedPrice} price={calcPrice} />
      )}
    </>
  );
};

export default IterationPoint;

/* 포인트 Style */
const Points = styled(CommonButton)`
  width: 100%;
  height: 14vh;
  margin: auto;
  border-radius: 10px;
  margin-bottom: 5vh;

  display: flex;
  justify-content: space-around;
  align-items: center;

  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);

  & > p {
    font-size: 20px;
    font-weight: bold;
  }

  ${({ price }) => {
    if (price === 1) return `background-color: #bbee8d;`;
    if (price === 3) return `background-color: #a3e4f5;`;
    if (price === 5) return `background-color: #ffd865;`;
    return `background-color: transparent;`; // 기본값: 투명
  }}

  &:hover {
    ${({ price }) => {
      if (price === 1) return `background-color: #9ddf64;`;
      if (price === 3) return `background-color: #66cae6;`;
      if (price === 5) return `background-color: #e1bc4c;`;
      return `background-color: transparent;`; // 기본값: 투명
    }};
  }
`;
