import styled from "styled-components";

const CommentModal = () => {
  return (
    <>
      <PopupMenu>
        <p onClick={() => {}}>수정</p>
        <p onClick={() => {}}>삭제</p>
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

  z-index: 3;
  position: absolute;
  right: 0;

  padding-left: 6%;
  padding-right: 6%;
  margin-top: 1vh;
  margin-right: 12vw;

  & > p {
    cursor: pointer;
    margin-bottom: 1vh;
    margin-top: 1vh;
  }

  & > p:hover {
    text-decoration: underline;
  }
`;
