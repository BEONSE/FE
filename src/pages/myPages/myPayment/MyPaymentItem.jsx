import styled from "styled-components";
import { useEffect } from "react";

const MyPaymentItem = ({list}) => {


  return (
    <>
      <hr/>
      <br/>
      <PaymentGroup>
        <div> 결제 코드 : {list.pid}</div>
        <div> 카드정보 : {list.cardName} ({list.cardNumber.toString().slice(-4)})</div>
        <div> 결제 금액 : {list.paymentPrice.toLocaleString()}원</div>
        <div> 적립된 포인트 : {list.points.toLocaleString()} p</div>
        <div>결제 날짜 : {list.paymentDate}</div>
      </PaymentGroup>
    </>
  )
}

export default MyPaymentItem;

const PaymentGroup = styled.div`
  width: 80vw;
  margin: auto auto 1vh auto;
`

