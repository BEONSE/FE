import { useState } from "react";
import { PayBtn } from "../../payment/PayModal";
import Modal from "react-modal";
import { usePageMoving } from "../../../components/usePageMoving";
import { ReqBranchUpdate } from "../../../apis/branch";
import styled from "styled-components";
import Pencil from "../../../assets/pencil.png";

const ModalBranchUpdate = ({ param, branchUpdate, imageFiles}) => {
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


   //이미지 업로드를 위한 이벤트 핸들러
  // const editBtn = async () => {
  //   try {
  //     const newImages = [];
  //     const multipartFormData = new FormData();
  //
  //     for (let i = 0; i < imageFiles.length; i++) {
  //       multipartFormData.append("image", imageFiles[i]);
  //       const uploadResponse = await ReqBranchUpdate(multipartFormData);
  //
  //       //각 이미지에 대한 업로드가 성공하면 새로운 이미지 주소를 배열에 추가
  //       if (uploadResponse.status === 200) {
  //         newImages.push(uploadResponse.data.imageURL);
  //       }
  //     }
  //     //배열에 있는 이미지 주소로 상태 업데이트
  //     setBranchUpdate({
  //       ...branchUpdate,
  //       image: [...branchUpdate.image, ...newImages],
  //     });
  //   } catch (error) {
  //     console.error("이미지 업로드 실패 : ", error);
  //   }
  // };


  const editBtn = async () => {
    try {
      const formData = new FormData();
      if (imageFiles) {
        imageFiles.forEach((item, index) => {
          formData.append(`image${index}`, item, item.name);
        });
      }
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
