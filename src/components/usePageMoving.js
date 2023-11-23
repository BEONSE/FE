import { useNavigate } from "react-router-dom";

export const usePageMoving = () => {
  const navigate = useNavigate();

  // 메인 페이지
  const moveToHome = () => {
    navigate("/", { replace: true });
  };
  // 로그인 페이지
  const moveToLogin = () => navigate("/login", { replace: true });

  // 회원가입 페이지
  const moveToRegister = () => navigate("/register", { replace: true });

  // 지점 목록/검색 페이지
  const moveToSearch = () => navigate("/search");

  // 지점 상세 페이지
  const moveToBranchInfo = (bid) => navigate(`/search/${bid}`);

  // 지점 예약하기
  const moveToReservation = (bid) => navigate(`/reservation/${bid}`);

  // 포인트 충전 페이지
  const moveToPayment = () => navigate("/payments");

  // 마이페이지 - 보유/사용 쿠폰 조회
  const moveToMyCoupon = () => navigate("/mypages/mycoupon");

  // 마이페이지 - 예약 확인
  const moveToMyReservation = () => navigate("/mypages/reservation");

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

  // 게시판 - 리뷰 작성
  const moveToWriteReview = (cid, bname) =>
    navigate(`/reviews/write/${cid}?bname=${bname}`, { replace: true });

  // 게시판 - 메이트
  const moveToMate = () => navigate("/mate");

  // 게시판 - 메이트/게시글 작성
  const moveToWrite = () => navigate("/mate/write");

  // 게시판 - 메이트/게시글 상세
  const moveToMateDetail = (id) => navigate(`/mate/${id}`);

  // 가맹점 관리자 페이지로 이동
  const moveToBranchManager = (bid) => navigate(`/branch/${bid}`);

  // 가맹점 리뷰 모아보기
  const moveToMyBranchReview = () => navigate("/branch/review");

  // 가맹점 쿠폰 사용 내역 모아보기
  const moveToUseCoupons = () => navigate("/branch/coupons");

  // 가맹점 정보 수정
  const moveToBranchUpdate = (bid) => navigate(`/branch/mypage/${bid}`);

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
    moveToReservation,
    moveToWrite,
    moveToMateDetail,
    moveToMyReservation,
    moveToBranchInfo,
    moveToBranchManager,
    moveToMyBranchReview,
    moveToUseCoupons,
    moveToBranchUpdate,
    moveToWriteReview,
  };
};
