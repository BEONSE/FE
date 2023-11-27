import Modal from "react-modal";
import styled from "styled-components";
import { PayBtn } from "../payment/PayModal";
import { ReqBranchReserve } from "../../apis/reservation";
import { useState } from "react";
import { usePageMoving } from "../../components/usePageMoving";

const ModalBranchReserve = ({ userReservation, bid, branchname, setClickBtn }) => {
  const { moveToMyReservation } = usePageMoving();

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      margin: "auto",
      width: "350px",
      height: "210px",
      padding: "0",
      overflow: "hidden",
    },
  };

  // 모달창 여닫 state
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setClickBtn(false);
  };

  // 예약 버튼 클릭 시
  const handleClickReservation = async () => {
    try {
      console.log(userReservation.reservationTime);
      const selectResponse = await ReqBranchReserve(bid["*"], userReservation);
      console.log("선택날ㅉ", selectResponse);
      if (selectResponse.status === 200) {
        moveToMyReservation();
      }
    } catch (err) {
      console.log(err);
    }
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
          {/* <img src={} alt="pencilimage" /> */}
          <p>
            선택 지점 : <span>{branchname}</span>
          </p>
          <h3>{userReservation.reservationTime}</h3>
          <p>예약을 하시겠습니까?</p>
          <div>
            <PayBtn isCancled onClick={closeModal}>
              취소
            </PayBtn>
            <PayBtn type="submit" onClick={handleClickReservation}>
              예약
            </PayBtn>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalBranchReserve;

// model 내용
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vh;

  & > img {
    height: 5vh;
    margin-bottom: 2vh;
  }

  & > p {
    font-size: 20px;

    & > span {
      font-weight: bold;
    }
  }

  & > h3 {
    color: red;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
