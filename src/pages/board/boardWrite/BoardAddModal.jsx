import Modal from "react-modal";
import Pencil from "../../../assets/pencil.png";
import { PayBtn } from "../../payment/PayModal";
import styled from "styled-components";
import { useState } from "react";
import { ReqReadMateBoard } from "../../../apis/mateBoard";
import { usePageMoving } from "../../../components/usePageMoving";

const BoardAddModal = ({ writeMate }) => {
  // 페이지 이동
  const { moveToMate } = usePageMoving();

  // 모달창 여닫 state
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await ReqReadMateBoard(writeMate);
      if (response.data.statusCode === 201) {
        console.log(response.data.successMessage);
        moveToMate();
      }
    } catch {}
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

  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <ModalContent>
          <img src={Pencil} alt="pencilimage" />
          <p>게시글을 등록하시겠습니까?</p>
          <div>
            <PayBtn isCancled onClick={closeModal}>
              취소
            </PayBtn>
            <PayBtn type="submit" onClick={SubmitForm}>
              등록
            </PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BoardAddModal;

// model 내용
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
  & > img {
    height: 5vh;
    margin-bottom: 2vh;
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
