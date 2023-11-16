import { useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import GlobalStyle from "../../components/GlobalStyle";

/* 결제 화면 Modal */
const PayModal = ({ clicked, price }) => {
  const [cardNum, setCardNum] = useState("");

  return (
    <>
      <GlobalStyle />
      <ModalBackground onClick={clicked}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>카드 정보 입력</h2>
          <CardType>
            <p>BC</p>
            <p>국민</p>
            <p>현대</p>
          </CardType>
          <CardNumber>
            <p>카드 번호</p>
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
          </CardNumber>
          <CardPassword>
            <p>카드 비밀 번호 </p>
            <input type="password" maxLength={2} />
            **
          </CardPassword>
          <PaymentPrice>
            <p>결제 금액 </p>
            <input type="text" readOnly defaultValue={price} />원
          </PaymentPrice>
          <Buttons>
            <PayBtn isCancled onClick={clicked}>
              취 소
            </PayBtn>
            <PayBtn>결 제</PayBtn>
          </Buttons>
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
  justify-content: center;
`;
/* 포인트 충전 카드 내용 */
const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80vw;

  background-color: white;
  margin: auto;
  border-radius: 5px;

  & > h2 {
    text-align: center;
    margin-top: 2vh;
    margin-bottom: 2vh;
  }
`;

/* 카드 번호 Style */
const CardNumber = styled.div``;

/* 카드 비밀번호 Style */
const CardPassword = styled.div``;

/* 결제 금액 Style */
const PaymentPrice = styled.div``;

/* 버튼 Style */

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const PayBtn = styled(CommonButton)`
  font-size: 15px;
  width: 20vw;

  margin-top: 4vh;

  background-color: ${({ isCancled }) => (isCancled ? "#d1d0d0" : null)};

  &:hover {
    background-color: ${({ isCancled }) => (isCancled ? "#b0b0b0" : null)};
  }
`;

// 카드 종류
const CardType = styled.div``;
