import styled from "styled-components";
import React from "react";


const PaymentItem = ({ list }) => {

  console.log("아이템", list);
  return (
    <>
      <PaymentGroup>
        <LeftInfo>
          <PaymentContent>
            <h3>#{list.pid}</h3>
            <div>
              <p>ID : {list.nickname}</p>
              <p>회원 이름 : {list.name}</p>
            </div>
            <div className="cardGroup">
              <p>카드사 : {list.cardName}</p>
              <p>카드번호 : {list.cardNumber}</p>
            </div>
            <p>주소 : {list.address}</p>
          </PaymentContent>
        </LeftInfo>
        <Date>
          신청 날짜 : {list.paymentDate}
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

  & > div {
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1vh;
    &.cardGroup {
      width: 85%;
    }
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