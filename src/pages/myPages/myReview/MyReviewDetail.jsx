import styled from "styled-components";
import React, { useState } from "react";
import Modal from "react-modal";

const MyReviewDetail = ({ data, setModalOpen, modalOpen }) => {
  const [isEmpty, setIsEmpty] = useState(false);

  const [openModal, setOpenModal] = useState(true);

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      margin: "auto",
      width: "80vw",
      height: "60vh",
      padding: "0",
      overflow: "auto",
    },
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >

        {!isEmpty &&
          <ContentGroup>
            <Profile>
              <div>
                <TimeDiv>
                  <p>작성일 {data.createdAt}</p>
                  <p>수정일 {data.modifiedAt}</p>
                </TimeDiv>
              </div>
            </Profile>
            <Content>
              {data.reviewImageData &&
                <ReviewImage>
                  <img src={`data:image/png;base64,${data.reviewImageData}`} />
                </ReviewImage>
              }
              <p>{data.content}</p>
            </Content>
          </ContentGroup>
        }
      </Modal>
    </>
  );
};

export default MyReviewDetail;

const ContentGroup = styled.div`
  border: 1px solid;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vh;
  margin-top: 3vh;
`;

const Profile = styled.div`
  margin-top: 2vh;
  margin-left: 5vw;
  margin-bottom: 3vh;

  & > div > div {
    display: flex;
  }

  & > div > div > img {
    width: 8vw;
    height: 5vh;
  }
`;

const TimeDiv = styled.div`
  display: flex;
  margin-left: 8vw;
  margin-top: -1.5vh;
  color: #aaaaaa;
  font-size: 13px;
  justify-content: space-around;
`;

const Content = styled.div`
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 3vh;
`;

const ReviewImage = styled.div`
  width: 100%;
  margin-bottom: 3vh;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;