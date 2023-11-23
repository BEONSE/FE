import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { PayBtn } from "../../pages/payment/PayModal";
import Login from "../../assets/login.png";
import { usePageMoving } from "../usePageMoving";

const LoginModal = ({ setCheckToken, checkToken }) => {
  const { moveToLogin } = usePageMoving();
  const [openModal, setOpenModal] = useState(true);

  const modalHandle = () => {
    setOpenModal(!openModal);
    setCheckToken(!checkToken);
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
        onRequestClose={modalHandle}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <img src={Login} alt="login" />
          <p>로그인 후 이용하실 수 있습니다.</p>
          <p>로그인 페이지로 이동하시겠습니까?</p>
          <div>
            <PayBtn isCancled onClick={modalHandle}>
              취 소
            </PayBtn>
            <PayBtn onClick={moveToLogin}>이 동</PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80vw;

  background-color: white;
  margin: auto;
  border-radius: 5px;
  padding: 20px;
  & > img {
    width: 20vw;
    margin: auto;
  }

  & > p {
    text-align: center;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
