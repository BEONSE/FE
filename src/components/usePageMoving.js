import { useNavigate } from "react-router-dom";

export const usePageMoving = () => {
  const navigate = useNavigate();

  // 메인 페이지
  const moveToHome = () => navigate("/");

  // 로그인 페이지
  const moveToLogin = () => navigate("/login");

  // 회원가입 페이지
  const moveToRegister = () => navigate("/register");

  // 지점 목록/검색 페이지
  const moveToSearch = () => navigate("/search");

  // 포인트 충전 페이지
  const moveToPayment = () => navigate("/payments");

  // 마이페이지 - 보유/사용 쿠폰 조회
  const moveToMyCoupon = () => navigate("/mypages/mycoupon");

  // 마이페이지 - 개인 정보 수정
  const moveToMyInfo = () => navigate("/mypages/myinfo");

  // 마이페이지 - 결제 내역
  const moveToMyPayment = () => navigate("/mypages/mypayment");

  // 마이페이지 - 내가 쓴 글 목록 전체
  const moveToMyBoard = () => navigate("/mypages/myboard/");

  // 마이페이지 - 내가 쓴 글 목록(리뷰)
  const moveToMyReview = () => navigate("/mypages/myboard/myreview");

  // 마이페이지 - 내가 쓴 글 목록(메이트)
  const moveToMyMate = () => navigate("/mypages/myboard/mymate");

  // 쿠폰 구매하기
  const moveToBuyCoupon = () => navigate("/coupon/purchasecoupon");

  // 게시판 - 리뷰
  const moveToReview = () => navigate("/reviews");

  // 게시판 - 메이트
  const moveToMate = () => navigate("/mate");

  return {
    moveToLogin,
    moveToRegister,
    moveToPayment,
    moveToMyCoupon,
    moveToMyInfo,
    moveToMyPayment,
    moveToMyReview,
    moveToMyMate,
    moveToMyBoard,
    moveToBuyCoupon,
    moveToReview,
    moveToMate,
    moveToHome,
    moveToSearch,
  };
};
