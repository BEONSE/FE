import Modal from "react-modal";
import { PayBtn } from "../../payment/PayModal";
import styled from "styled-components";
import { useState } from "react";
import { ReqUpdateProfile } from "../../../apis/auth";
import { usePageMoving } from "../../../components/usePageMoving";
import { useEffect } from "react";

const ModalMyInfoUpdate = ({ commonUpdate, setModalOpen, modalOpen }) => {
  const [openModal, setOpenModal] = useState(true);

  //홈으로 이동
  const { moveToHome } = usePageMoving();

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

  const editBtn = async () => {
    try {
      const userInfoResponse = await ReqUpdateProfile(commonUpdate);
      if (userInfoResponse.status === 200) {
        closeModal();
        moveToHome();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(commonUpdate);
  });

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <p>수정하시겠습니까?</p>
          <div>
            <PayBtn isCancled onClick={closeModal}>
              취 소
            </PayBtn>
            <PayBtn onClick={editBtn}>수 정</PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMyInfoUpdate;

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
