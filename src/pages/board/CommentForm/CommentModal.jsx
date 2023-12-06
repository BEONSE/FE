import { useState } from "react";
import styled from "styled-components";
import DeleteModal from "./DeleteModal";

const CommentModal = ({ mcid, mateBoardMbid, toggleMenu, clickKebob }) => {
  const [isRemoveModal, setIsRemoveModal] = useState(false);

  const openModal = () => {
    setIsRemoveModal(!isRemoveModal);
  };

  return (
    <>
      <PopupMenu>
        <p onClick={() => {}}>수정</p>
        <p onClick={openModal}>삭제</p>
        {isRemoveModal && (
          <DeleteModal
            mcid={mcid}
            mateBoardMbid={mateBoardMbid}
            toggleMenu={toggleMenu}
            clickKebob={clickKebob}
          />
        )}
      </PopupMenu>
    </>
  );
};

export default CommentModal;

const PopupMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: white;

  border: 2px solid #ececec;

  position: absolute;
  right: 0;

  padding-left: 6%;
  padding-right: 6%;
  margin-top: 1vh;
  margin-right: 14vw;

  & > p {
    cursor: pointer;
    margin-bottom: 1vh;
    margin-top: 1vh;
  }

  & > p:hover {
    text-decoration: underline;
  }
`;
