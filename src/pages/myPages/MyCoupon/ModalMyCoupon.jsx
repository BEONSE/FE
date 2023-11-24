import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Check from "../../../assets/check.png";
import { PayBtn } from "../../payment/PayModal";

const ModalMyCoupon = ({ content, modalState, reqApi }) => {
  const [openModal, setOpenModal] = useState(true);

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)",
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
    modalState(false);
  };

  const handleSubmitBtn = () => {
    if (typeof reqApi === "function") {
      reqApi();
    } else {
      closeModal();
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
          <img src={Check} alt="check" />
          <p>{content}</p>
          <div>
            <PayBtn isCancled onClick={closeModal}>
              취 소
            </PayBtn>
            <PayBtn onClick={handleSubmitBtn}>확 인</PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMyCoupon;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4vh;

  & > img {
    width: 10vw;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
