import styled from "styled-components";
import PayModal from "./PayModal";
import { useContext, useState } from "react";
import Point1 from "../../assets/point1.png";
import Point2 from "../../assets/point2.png";
import Point3 from "../../assets/point3.png";
import AppContext from "../../AppContext";
import LoginModal from "../../components/LoginModal";
import WarningModal from "../../components/WarningModal";
import { usePageMoving } from "../../components/usePageMoving";

/* 결제 종류 컴포넌트 */
const IterationPoint = ({ price }) => {
  const { moveToPayment } = usePageMoving();
  const appContext = useContext(AppContext);
  const [isPayModal, setPayModal] = useState(false);
  const [checkToken, setCheckToken] = useState(false);

  const calcPoint = price * 10000;
  const calcPrice = price * 11000;

  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const formattedPoint = calcPoint.toLocaleString();
  const formattedPrice = calcPrice.toLocaleString();

  const [modalOpen, setModalOpen] = useState(false);

  const openPay = () => {
    setPayModal(true);
  };

  const closePay = () => {
    setPayModal(false);

  };

  const checkLogin = () => {
    if (appContext.accessToken) {
      openPay();
    } else {
      setCheckToken(!checkToken);
    }
  };

  return (
    <>
      <Points onClick={checkLogin} price={price}>
        {price === 1 && <img src={Point1} alt="pointimg" />}
        {price === 3 && <img src={Point2} alt="pointimg" />}
        {price === 5 && <img src={Point3} alt="pointimg" />}
      </Points>
      {modalState && <WarningModal content={modalContent} movePage={moveToPayment} />}

      {isPayModal && (
        <PayModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          formattedPrice={formattedPrice}
          price={calcPrice}
          setModalState={setModalState}
          setModalContent={setModalContent}
          closePay={closePay}
        />
      )}
      {checkToken && <LoginModal setCheckToken={setCheckToken} checkToken={checkToken} />}
    </>
  );
};

export default IterationPoint;

/* 포인트 Style */
const Points = styled.div`
  width: 100%;
  height: 14vh;
  margin: auto;
  margin-bottom: 10vh;

  display: flex;
  justify-content: space-around;
  align-items: center;

  & > img {
    margin-top: 10vh;
    width: 100%;
  }
`;
