import styled from "styled-components";
import PayModal from "./PayModal";
import { useState } from "react";

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
      <Points onClick={openPay}>
        <h2>
          {formattedPoint}p<p>{price}만원</p>
        </h2>
      </Points>
      {isPayModal && <PayModal clicked={closePay} price={formattedPrice} />}
    </>
  );
};

export default IterationPoint;

/* 포인트 Style */
const Points = styled.div`
  background-color: #99e8f8;
  width: 60vw;
  height: 90px;
  margin: auto;
  border-radius: 10px;

  & > h2 {
    text-align: left;
    padding-top: 30px;
    margin-top: 30px;
    margin-left: 30px;
  }

  & > h2 > p {
    font-size: large;
    margin-left: 170px;
    display: inline;
  }
`;
