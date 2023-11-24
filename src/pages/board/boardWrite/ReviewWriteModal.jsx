import Modal from "react-modal";
import Pencil from "../../../assets/pencil.png";
import { PayBtn } from "../../payment/PayModal";
import styled from "styled-components";
import { useState } from "react";
import { usePageMoving } from "../../../components/usePageMoving";
import { ReqReviewWrite } from "../../../apis/reviewBoard";

const ReviewWriteModal = ({ cid, writeReview, image }) => {
  // 페이지 이동
  const { moveToMyCoupon } = usePageMoving();

  // 모달창 여닫 state
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 등록하기 버튼
  const submitBtn = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image[0]);
      formData.append(
        "reviewBoardDTO",
        new Blob([JSON.stringify(writeReview)], { type: "application/json" }),
      );

      const writeResponse = await ReqReviewWrite(cid, formData);
      moveToMyCoupon();
      console.log(writeResponse);
    } catch (err) {
      console.log(err);
    }
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <img src={Pencil} alt="pencilimage" />
          <p>게시글을 등록하시겠습니까?</p>
          <div>
            <PayBtn isCancled onClick={closeModal}>
              취소
            </PayBtn>
            <PayBtn type="submit" onClick={submitBtn}>
              등록
            </PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewWriteModal;

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
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
