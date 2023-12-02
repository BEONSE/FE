import styled from "styled-components";
import React from "react";


const PaymentItem = ({ list }) => {

  return (
    <>
      <PaymentGroup>
        <LeftInfo>
          <PaymentContent>
            <p>결제 코드 : {list.pid}</p>
            <div>
              <p>ID : {list.nickname}</p>
              <p>회원 이름 : {list.name}</p>
            </div>
            <div className="payGroup">
              <p>결제 포인트 : {parseInt(list.points).toLocaleString()}</p>
              <p>결제 금액 : {parseInt(list.price).toLocaleString()}</p>
            </div>
            <div className="payGroup">
              <p>카드사 : {list.cardName}</p>
              <p>카드번호 : {list.cardNumber}</p>
            </div>
            <p>주소 : {list.address}</p>
          </PaymentContent>
        </LeftInfo>
        <Date>
          결제 날짜 : {list.paymentDate}
        </Date>
      </PaymentGroup>
      <Hr />
    </>
  );
};

export default PaymentItem;

const PaymentGroup = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  margin-bottom: 1vh;

  padding-left: 2vw;
  padding-right: 2vw;

  & > div {
    display: flex;
    justify-content: space-around;
  }
`;

const LeftInfo = styled.div`
  display: flex;
`;

/* 세부 내용 Style */
const PaymentContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  & > p {
    margin-bottom: 1vh;
  }

  & > div {
    display: grid;
  }

`;

/* 날짜 Style */
const Date = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  margin-left: 4vw;
  color: #8f8f8f;
`;

const Hr = styled.hr`
  margin-top: 1vh;
  margin-bottom: 1vh;
`;