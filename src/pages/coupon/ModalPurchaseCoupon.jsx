import Modal from "react-modal";
import { PayBtn } from "../payment/PayModal";
import styled from "styled-components";
import { useState } from "react";
import { ReqPaymentsByCoupon } from "../../apis/coupon";

const ModalPurchaseCoupon = ({ selectCoupon, setModalOpen, modalOpen }) => {
  const [openModal, setOpenModal] = useState(true);

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      margin: "auto",
      width: "350px",
      height: "200px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalOpen(!modalOpen);
  };

  const submitBtn = async () => {
    try {
      const couponResponse = await ReqPaymentsByCoupon(selectCoupon);
      if (couponResponse.status === 200) {
        closeModal();
      }
      console.log(couponResponse);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <p>
            <span>{selectCoupon.type}</span> &nbsp;
            <span>{selectCoupon.quantity}장</span>
          </p>
          <p>구매하시겠습니까?</p>
          <div>
            <PayBtn isCancled onClick={closeModal}>
              취 소
            </PayBtn>
            <PayBtn onClick={submitBtn}>구 매</PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPurchaseCoupon;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4vh;

  & > p {
    width: 80%;
    font-size: 20px;
    text-align: center;

    & > span {
      font-weight: bold;
      font-size: 26px;
    }
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
