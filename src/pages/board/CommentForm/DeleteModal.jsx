import Modal from "react-modal";
import styled from "styled-components";
import { PayBtn } from "../../payment/PayModal";
import { useState } from "react";
import { ReqRemoveComment } from "../../../apis/mateBoard";

const DeleteModal = ({ mcid, mateBoardMbid, toggleMenu, clickKebob }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    toggleMenu(!clickKebob);
  };

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

  // 삭제 handler
  const removeHandle = async () => {
    try {
      const removeResponse = await ReqRemoveComment(mateBoardMbid, mcid);
      if (removeResponse.data.statusCode === 200) {
        window.location.reload();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
        <ModalContent>
          <h2>😧</h2>
          <p>댓글을 삭제하시겠습니까?</p>
          <div>
            <PayBtn isCancled onClick={closeModal}>
              취소
            </PayBtn>
            <PayBtn type="submit" onClick={removeHandle}>
              삭제
            </PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;

const ModalContent = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
  & > h2 {
    font-size: 30px;
    margin-bottom: 1vh;
  }
  & > p {
    font-size: 20px;
    font-weight: bold;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
