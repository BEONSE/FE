import styled from "styled-components";

const Sidebar = () => {
  // 모달창 배경
  const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    width: 50%;
  `;
  // 모달창 내용
  const ModalContent = styled.div``;
  return (
    <>
      <p>사이드바 임니다.</p>
    </>
  );
};

export default Sidebar;
