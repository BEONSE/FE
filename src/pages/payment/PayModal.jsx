import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import GlobalStyle from "../../components/GlobalStyle";
import { ReqPaymentsByPoint } from "../../apis/point";
import Modal from "react-modal";

/* 결제 화면 Modal */
const PayModal = ({ setModalOpen, modalOpen, formattedPrice, price }) => {
  const [openModal, setOpenModal] = useState(true);
  const [cardNum, setCardNum] = useState(""); // 카드 번호

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      margin: "auto",
      width: "320px",
      height: "420px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalOpen(!modalOpen);
  };

  const [reqCardInfo, setReqCardInfo] = useState({
    paymentPrice: price,
    cardName: "",
    cardNumber: "",
  });

  // 결제 버튼 클릭 handler
  const clickPayBtn = async () => {
    try {
      const payResponse = await ReqPaymentsByPoint(reqCardInfo);
      console.log(payResponse);
      if (payResponse.data.statusCode === 200) {
        alert(payResponse.data.successMessage);
        window.location.reload();
        closeModal();
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

      cardNumber: reqCardInfo.cardNumber,

    }));
    console.log(reqCardInfo);
    console.log(cardNum);
    console.log(reqCardInfo.cardNum);
  }, []);

  const selectedHandler = (e) => {
    setReqCardInfo((prevValue) => ({
      ...prevValue,
      cardName: e.target.value,
      cardNumber: cardNum,
    }));
  }


  return (
    <>
      <GlobalStyle />
      <Modal isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}>
        <ModalContent>
          <h2>카드 정보 입력</h2>
          <SelectBox>
            <select onChange={selectedHandler} defaultValue={reqCardInfo.cardName}>
              <option value={"default"}>--- 카드사 선택 ---</option>
              <option value={"비씨"}>비씨</option>
              <option value={"국민"}>국민</option>
              <option value={"현대"}>현대</option>
              <option value={"우리"}>우리</option>
              <option value={"삼성"}>삼성</option>
              <option value={"농협"}>농협</option>
              <option value={"신한"}>신한</option>
              <option value={"하나"}>하나</option>
              <option value={"롯데"}>롯데</option>
              <option value={"씨티"}>씨티</option>
              <option value={"광주은행"}>광주은행</option>
              <option value={"수협"}>수협</option>
              <option value={"전북은행"}>전북은행</option>
              <option value={"우체국"}>우체국</option>
              <option value={"제주"}>제주</option>
              <option value={"신협"}>신협</option>
              <option value={"MG새마을"}>MG새마을</option>
              <option value={"카카오뱅크"}>카카오뱅크</option>
              <option value={"케이뱅크"}>케이뱅크</option>
              <option value={"저축은행"}>저축은행</option>
              <option value={"KDB산업"}>KDB산업</option>
            </select>
          </SelectBox>
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
            <PayBtn isCancled onClick={closeModal}>
              취 소
            </PayBtn>
            <PayBtn onClick={clickPayBtn}>결 제</PayBtn>
          </Buttons>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PayModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4vh;
  
  & > h2 {
    margin-bottom: 2vh;
  }
`;

// 카드 정보 전체 div
const CardInfo = styled.div`
`;

/* 카드 번호 Style */
const CardNumber = styled.div`
  margin-bottom: 2vh;
  & > div > input {
    padding: 2%;
    width: 181px;
  }
`;

/* 카드 비밀번호 Style */
const CardPassword = styled.div`
  margin-bottom: 2vh;
  & > input {
    padding: 2%;
    width: 28px;
  }
`;

/* 결제 금액 Style */
const PaymentPrice = styled.div`
  & > input {
    padding:2%;
    width: 178px;
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

const SelectBox = styled.div`
  width: 90vw;
  margin-bottom: 2vh;
  text-align: center;
  & > select {
    font-family: "S-CoreDream-light";
    font-weight: bold;
    padding: 1.5%;
    width: 50%;
    text-align: center;
  }
`;
