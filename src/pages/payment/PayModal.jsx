import { useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";

/* 결제 화면 Modal */
const PayModal = ({ clicked, price }) => {
  const [cardNum, setCardNum] = useState("");

  return (
    <>
      <ModalBackground onClick={clicked}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CardNumber>
            <p>
              카드 번호 :{" "}
              <NumberFormat
                format="####-####-####-####"
                mask="_"
                placeholder="1111-1111-1111-1111"
                className="number-format-input"
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  if (value.length === 16) {
                    setCardNum({ formattedValue });
                  }
                }}
              />
            </p>
          </CardNumber>
          <CardPassword>
            <p>
              카드 비밀 번호 : <input type="password" maxLength={2}></input>**
            </p>
          </CardPassword>
          <PaymentPrice>
            <p>
              결제 금액 : <input type="text" readOnly defaultValue={price}></input>원
            </p>
          </PaymentPrice>
          <Button>
            <button>취소</button>
            <button>결제</button>
          </Button>
        </ModalContent>
      </ModalBackground>
    </>
  );
};

export default PayModal;

/* modal open 시 배경 설정 */
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: right;
`;
/* 포인트 충전 카드 내용 */
const ModalContent = styled.div`
  @media (max-width: 1170px) {
    width: 50vw;
    font-size: 14px;
  }

  background-color: white;
  height: 35vh;
  margin: auto;
  text-align: left;
  border-radius: 5px;
`;

/* 카드 번호 Style */
const CardNumber = styled.div`
  display: inline;
  margin-left: 30px;

  & > p {
    margin-top: 50px;
    margin-left: 20%;
  }

  & > p > .number-format-input {
    width: 130px;
    text-align: center;
  }
`;

/* 카드 비밀번호 Style */
const CardPassword = styled.div`
  margin-top: 20px;
  margin-left: 20%;

  & > p > input {
    width: 20px;
    text-align: center;
  }
`;

/* 결제 금액 Style */
const PaymentPrice = styled.div`
  margin-top: 20px;
  margin-left: 20%;

  & > p > input {
    width: 60px;
    font-size: 14px;
    border: 0;
    border-color: #99e8f8;
    text-align: right;
  }
`;

/* 버튼 Style */
const Button = styled.div`
  margin-top: 50px;
  margin-left: 25%;

  & > button {
    display: inline-block;
    width: 60px;
    height: 30px;
    color: black;
    background-color: #99e8f8;
    font-size: 16px;
    border: none;
    border-radius: 15px;
    margin-left: 20px;
  }

  & > button:first-child {
    background-color: #bbb2b2;
  }
`;
