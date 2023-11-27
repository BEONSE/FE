import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { PayBtn } from "../../pages/payment/PayModal";
import Checked from "../../assets/checked.png";

const WarningModal = ({ content, content2, movePage }) => {
  const [openModal, setOpenModal] = useState(true);

  const modalHandle = () => {
    setOpenModal(!openModal);
  };

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 9,
    },
    content: {
      margin: "auto",
      width: "350px",
      height: "240px",
      padding: "0",
      overflow: "hidden",
    },
  };
  return (
    <>
      <Modal
        isOpen={openModal}
        // onRequestClose={modalHandle}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <img src={Checked} alt="check" />
          <p>{content}</p>
          <p>{content2}</p>
          <div>
            <PayBtn onClick={movePage}>확 인</PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WarningModal;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  margin: auto;
  border-radius: 5px;
  padding: 20px;
  & > img {
    margin-top: auto;
    width: 65px;
    margin: auto;
    margin-bottom: 20px;
  }

  & > p {
    text-align: center;
    font-size: 18px;
  }
  & > div {
    margin: auto;
    & > ${PayBtn} {
      margin-top: 2vh;
    }
  }
`;
