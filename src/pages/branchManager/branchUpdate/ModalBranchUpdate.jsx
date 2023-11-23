import { useState } from "react";
import { PayBtn } from "../../payment/PayModal";
import Modal from "react-modal";
import { usePageMoving } from "../../../components/usePageMoving";
import { ReqBranchUpdate } from "../../../apis/branch";
import styled from "styled-components";

const ModalBranchUpdate = ({ branchUpdate, setModalOpen, modalOpen, image }) => {
  const [openModal, setOpenModal] = useState(true);

  //가맹점 메인으로 이동
  const { moveToBranchManager } = usePageMoving();

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      margin: "auto",
      width: "320px",
      height: "165px",
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
      const formData = new FormData();
      image.map((item) => formData.append("image", item));
      // formData.append("image", image[0]);
      // formData.append("image", image[1]);
      // formData.append("image", image[2]);
      // formData.append("image", image[3]);
      // formData.append("image", image[4]);
      formData.append(
        "branchRequestDTO",
        new Blob([JSON.stringify(branchUpdate)], {
          type: "application/json",
        }),
      );
      const branchInfoResponse = await ReqBranchUpdate(formData);
      console.log(branchInfoResponse);
      closeModal();
      moveToBranchManager();
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

export default ModalBranchUpdate;

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
