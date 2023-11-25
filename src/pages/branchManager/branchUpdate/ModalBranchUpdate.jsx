import { useEffect, useState } from "react";
import { PayBtn } from "../../payment/PayModal";
import Modal from "react-modal";
import { usePageMoving } from "../../../components/usePageMoving";
import { ReqBranchUpdate } from "../../../apis/branch";
import styled from "styled-components";
import Pencil from "../../../assets/pencil.png";

const ModalBranchUpdate = ({ param, branchUpdate, image}) => {
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

  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    setModalOpen(!modalOpen);
  };


  const editBtn = async () => {
    try {
      const formData = new FormData();

      console.log(image)
      if (image) {
        for (let i = 0; i < image.length; i++) {
          formData.append("image", image[i]);
        }
      }
      formData.append("branchRequestDTO", new Blob([JSON.stringify(branchUpdate)],
          { type: "application/json", }),
      );
      const branchInfoResponse = await ReqBranchUpdate(formData);
      console.log(branchInfoResponse);
      closeModal();
      moveToBranchManager(param.bid);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(branchUpdate);
  }, );

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContent>
          <img src={Pencil} alt="pencilimage" />
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
  padding-top: 1.25vh;

  & > img {
    height: 3vh;
    margin-bottom: 2vh;
  }

  & > p {
    //width: 80%;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
