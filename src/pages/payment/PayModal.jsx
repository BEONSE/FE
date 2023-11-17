import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import GlobalStyle from "../../components/GlobalStyle";
import { ReqPaymentsByPoint } from "../../apis/point";

/* 결제 화면 Modal */
const PayModal = ({ clicked, formattedPrice, price }) => {
  const [cardType, setCardType] = useState(""); // 카드 사
  const [cardNum, setCardNum] = useState(""); // 카드 번호

  const [reqCardInfo, setReqCardInfo] = useState({
    paymentPrice: price,
    cardName: "",
    cardNumber: "",
  });

  // 카드사 선택 handler
  const clickCardType = (card) => {
    setCardType(card);
  };

  // 결제 버튼 클릭 handler
  const clickPayBtn = async () => {
    try {
      const payResponse = await ReqPaymentsByPoint(reqCardInfo);
      console.log(payResponse);
      if (payResponse.data.statusCode === 200) {
        alert(payResponse.data.successMessage);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(reqCardInfo);
  });

  useEffect(() => {
    setReqCardInfo((prevValue) => ({
      ...prevValue,
      cardName: cardType,
      cardNumber: cardNum,
    }));
  }, [cardNum, cardType]);

  return (
    <>
      <GlobalStyle />
      <ModalBackground onClick={clicked}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>카드 정보 입력</h2>
          <CardType>
            <Card
              onClick={() => {
                clickCardType("비씨");
              }}
              className={cardType === "비씨" ? "selected" : ""}
            >
              비씨
            </Card>
            <Card
              onClick={() => {
                clickCardType("국민");
              }}
              className={cardType === "국민" ? "selected" : ""}
            >
              국민
            </Card>
            <Card
              onClick={() => {
                clickCardType("현대");
              }}
              className={cardType === "현대" ? "selected" : ""}
            >
              현대
            </Card>
            <Card
              onClick={() => {
                clickCardType("우리");
              }}
              className={cardType === "우리" ? "selected" : ""}
            >
              우리
            </Card>
            <Card
              onClick={() => {
                clickCardType("삼성");
              }}
              className={cardType === "삼성" ? "selected" : ""}
            >
              삼성
            </Card>
            <Card
              onClick={() => {
                clickCardType("농협");
              }}
              className={cardType === "농협" ? "selected" : ""}
            >
              농협
            </Card>
            <Card
              onClick={() => {
                clickCardType("신한");
              }}
              className={cardType === "신한" ? "selected" : ""}
            >
              신한
            </Card>
            <Card
              onClick={() => {
                clickCardType("하나");
              }}
              className={cardType === "하나" ? "selected" : ""}
            >
              하나
            </Card>
            <Card
              onClick={() => {
                clickCardType("롯데");
              }}
              className={cardType === "롯데" ? "selected" : ""}
            >
              롯데
            </Card>
            <Card
              onClick={() => {
                clickCardType("씨티");
              }}
              className={cardType === "씨티" ? "selected" : ""}
            >
              씨티
            </Card>
            <Card
              onClick={() => {
                clickCardType("광주은행");
              }}
              className={cardType === "광주은행" ? "selected" : ""}
            >
              광주은행
            </Card>
            <Card
              onClick={() => {
                clickCardType("수협");
              }}
              className={cardType === "수협" ? "selected" : ""}
            >
              수협
            </Card>
            <Card
              onClick={() => {
                clickCardType("전북은행");
              }}
              className={cardType === "전북은행" ? "selected" : ""}
            >
              전북은행
            </Card>
            <Card
              onClick={() => {
                clickCardType("우체국");
              }}
              className={cardType === "우체국" ? "selected" : ""}
            >
              우체국
            </Card>
            <Card
              onClick={() => {
                clickCardType("제주");
              }}
              className={cardType === "제주" ? "selected" : ""}
            >
              제주
            </Card>
            <Card
              onClick={() => {
                clickCardType("신협");
              }}
              className={cardType === "신협" ? "selected" : ""}
            >
              신협
            </Card>
            <Card
              onClick={() => {
                clickCardType("MG새마을");
              }}
              className={cardType === "MG새마을" ? "selected" : ""}
            >
              MG새마을
            </Card>
            <Card
              onClick={() => {
                clickCardType("카카오뱅크");
              }}
              className={cardType === "카카오뱅크" ? "selected" : ""}
            >
              카카오뱅크
            </Card>
            <Card
              onClick={() => {
                clickCardType("케이뱅크");
              }}
              className={cardType === "케이뱅크" ? "selected" : ""}
            >
              케이뱅크
            </Card>
            <Card
              onClick={() => {
                clickCardType("저축은행");
              }}
              className={cardType === "저축은행" ? "selected" : ""}
            >
              저축은행
            </Card>
            <Card
              onClick={() => {
                clickCardType("KDB산업");
              }}
              className={cardType === "KDB산업" ? "selected" : ""}
            >
              KDB산업
            </Card>
          </CardType>
          <CardInfo>
            <CardNumber>
              <p>카드 번호</p>
              <div>
                <NumberFormat
                  format="####-####-####-####"
                  mask="_"
                  placeholder="1111-1111-1111-1111"
                  className="number-format-input"
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    if (value.length === 16) {
                      setCardNum(formattedValue);
                    }
                  }}
                />
              </div>
            </CardNumber>
            <CardPassword>
              <p>카드 비밀 번호 </p>
              <input type="password" maxLength={2} placeholder="**" />
              **
            </CardPassword>
            <PaymentPrice>
              <p>결제 금액 </p>
              <input readOnly defaultValue={formattedPrice} />원
            </PaymentPrice>
          </CardInfo>
          <Buttons>
            <PayBtn isCancled onClick={clicked}>
              취 소
            </PayBtn>
            <PayBtn onClick={clickPayBtn}>결 제</PayBtn>
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

// 카드 정보 전체 div
const CardInfo = styled.div`
  margin: auto;
`;

/* 카드 번호 Style */
const CardNumber = styled.div``;

/* 카드 비밀번호 Style */
const CardPassword = styled.div`
  & > input {
    padding: 2%;
    width: 20%;
  }
`;

/* 결제 금액 Style */
const PaymentPrice = styled.div`
  & > input {
    padding: 2%;
    width: 80%;
  }
`;

/* 버튼 Style */

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 3vh;
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
const CardType = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  & > p.selected {
    background-color: #99e8f8; /* 예시 색상 */
  }
`;

const Card = styled.p`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  border: 1px solid #ececec;
  width: 30%;
  padding: 1%;
  margin-bottom: 2%;
  &:hover {
    background-color: #99e8f8;
  }
`;
