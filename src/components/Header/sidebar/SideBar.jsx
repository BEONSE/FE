import styled from "styled-components";
import Dropdown from "./Dropdown";
import { usePageMoving } from "../../usePageMoving";

const Sidebar = ({ clicked }) => {
  const {
    moveToLogin,
    moveToBranchies,
    moveToPayment,
    moveToMyCoupon,
    moveToMyInfo,
    moveToMyPayment,
    moveToMyBoard,
    moveToBuyCoupon,
  } = usePageMoving();
  return (
    <>
      <ModalBackground onClick={clicked}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <LogoutPosition>
            <p>로그아웃</p>
          </LogoutPosition>
          <LoginPositon>
            <h1
              onClick={() => {
                moveToLogin();
                clicked();
              }}
            >
              로그인/회원가입하러가기
            </h1>
            {/* 로그인 후 유저 정보 띄워줘야됨 */}
          </LoginPositon>

          <ModalList>
            <p
              onClick={() => {
                moveToMyCoupon();
                clicked();
              }}
            >
              보유/사용 쿠폰 조회
            </p>
            <p
              onClick={() => {
                moveToPayment();
                clicked();
              }}
            >
              포인트 충전하기
            </p>
            <p
              onClick={() => {
                moveToBuyCoupon();
                clicked();
              }}
            >
              쿠폰 구매하기
            </p>
            <p
              onClick={() => {
                moveToMyInfo();
                clicked();
              }}
            >
              개인 정보 수정
            </p>
            <p
              onClick={() => {
                moveToMyBoard();
                clicked();
              }}
            >
              내가 쓴 글 목록
            </p>
            <p
              onClick={() => {
                moveToMyPayment();
                clicked();
              }}
            >
              결제 내역
            </p>
            <p
              onClick={() => {
                moveToBranchies();
                clicked();
              }}
            >
              세차장 예약
            </p>
            <p
              onClick={() => {
                moveToBranchies();
                clicked();
              }}
            >
              지점 검색
            </p>
            <Dropdown clicked={clicked} />
          </ModalList>
        </ModalContent>
      </ModalBackground>
    </>
  );
};

export default Sidebar;

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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 1170px) {
    width: 70vw;
    font-size: 9px;
  }
  width: 24vw;
  height: 100vh;
  padding: 20px;
  background-color: #333333;
  font-size: 9px;
  color: white;

  & > h1 {
    &:hover {
      color: #99e8f8;
    }
  }
`;

// 사이드바 목록 디자인
const ModalList = styled.div`
  display: inline-flex;
  flex-direction: column;
  & > p {
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 35px;
    &:hover {
      color: #99e8f8;
    }
  }
`;

// 사이드바 로그인 영역 div
const LoginPositon = styled.div`
  & > h1 {
    cursor: pointer;
    &:hover {
      color: #99e8f8;
    }
  }
  height: 10%;
`;

// 사이드바 로그아웃 영역
const LogoutPosition = styled.div`
  position: absolute;
  width: 60vw;
  text-align: right;
  font-size: 15px;
  cursor: pointer;
  padding-bottom: 40px;
  @media (max-width: 1170px) {
    font-size: 13px;
  }
  & > p {
    &:hover {
      color: #99e8f8;
    }
  }
`;
