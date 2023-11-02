import styled from "styled-components";
/* Styled Component */
// 사이드바 배경
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: right;
`;
// 사이드바 내용
const ModalContent = styled.div`
  @media (max-width: 375px) {
    width: 70vw;
    font-size: 9px;
  }
  width: 35vw;
  height: 100vh;
  padding: 20px;
  background-color: #333333;
  font-size: 11px;
  color: white;
`;

// 사이드바 목록 디자인

const Sidebar = ({ clicked }) => {
  return (
    <>
      <ModalBackground onClick={clicked}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {/* <button onClick={clicked}>취소</button> */}
          <h1>로그인/회원가입하러가기</h1>
          <p>보유/사용 쿠폰 조회</p>
          <p>포인트 충전하기</p>
          <p>쿠폰 구매하기</p>
          <p>개인 정보 수정</p>
          <p>내가 쓴 글 목록</p>
          <p>결제 내역</p>
          <p>로그아웃</p>
        </ModalContent>
      </ModalBackground>
    </>
  );
};

export default Sidebar;
