import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import GlobalStyle from "../../components/GlobalStyle";
import { LoginAllDiv } from "./branchUpdate";
import BranchReview from "./review";
import CouponList from "./coupon";
import { useEffect, useState } from "react";
import { usePageMoving } from "../../components/usePageMoving";
import { useParams } from "react-router-dom";
import { ReqBranchCoupon, ReqBranchReservation, ReqBranchReview } from "../../apis/branch";
import { ReqBranchName } from "../../apis/reservation";
import Loading from "../../components/Loading";
import Logout from "../../components/Logout";
import BranchReservation from "../branchReservation";
import BranchReservationList from "./reservation";

const BranchHome = () => {
  const { moveToBranchUpdate, moveToHome } = usePageMoving();

  const param = useParams("bid");
  const [reviewEmpty, setReviewEmpty] = useState(false);
  const [couponEmpty, setCouponEmpty] = useState(false);
  const [reservationEmpty, setReservationEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);

  // 클릭 상태
  const [selectedType, setSelectedType] = useState(null);

  // branch이름 가져오기
  const [bname, setBname] = useState("");

  const [review, setReview] = useState();

  const [coupon, setCoupon] = useState();

  const [reservation, setReservation] = useState();
  // 페이지
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState("");

  const loadMore = async () => {
    setIsLoading2(true);
    try {
      const reviewResponse = await ReqBranchReview(param["*"], page + 1);
      console.log(reviewResponse.data);
      if (reviewResponse.data.content.length === 0) {
        setReviewEmpty(true);
      } else {
        setReview([...review, ...reviewResponse.data.content]);
        setPageData(reviewResponse.data);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading2(false);
    }
  };

  const loadMoreUsedCoupons = async () => {
    setIsLoading2(true);
    try {
      const couponResponse = await ReqBranchCoupon(page + 1);
      if (couponResponse.data.content.length === 0) {
        setCouponEmpty(true);
      } else {
        setCoupon([...coupon, ...couponResponse.data.content]);
        setPageData(couponResponse.data);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading2(false);
    }
  };

  const loadMoreUsedReserve = async () => {
    setIsLoading2(true);
    try {
      const reserveResponse = await ReqBranchReservation(page + 1);
      if (reserveResponse.data.content.length === 0) {
        setReservationEmpty(true);
      } else {
        setReservation([...reservation, ...reserveResponse.data.content]);
        setPageData(reserveResponse.data);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading2(false);
    }
  };

  const throttle = (func, delay) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // 스크롤이 맨 아래에 도달하면 새로운 데이터 로드
      if (selectedType === "review") {
        loadMore();
      } else if (selectedType === "coupon") {
        loadMoreUsedCoupons();
      } else if (selectedType === "reservation") {
        loadMoreUsedReserve();
      }
    }
  };

  useEffect(() => {
    const handleScrollThrottle = throttle(handleScroll, 20); // 쓸데없이 많은 이벤트 호출을 방지하기 위한 스크롤 쓰로틀링

    window.addEventListener("scroll", handleScrollThrottle);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, [handleScroll]);

  // 브랜치 이름 가져오기
  useEffect(() => {
    async function getBranchName() {
      try {
        const bnameResponse = await ReqBranchName(param.bid);
        console.log("이름", bnameResponse);
        setBname(bnameResponse.data);
      } catch (err) {
        console.log(err);
      }
    }

    getBranchName();
  }, []);

  //리뷰 가져오기
  useEffect(() => {
    async function getReview() {
      try {
        const reviewResponse = await ReqBranchReview(param.bid);
        console.log(reviewResponse);
        console.log(param.bid);
        if (reviewResponse.status === 200) {
          setReview(reviewResponse.data.content);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getReview();
  }, []);
  // [param["*"]]

  //쿠폰 가져오기
  useEffect(() => {
    async function getCoupon() {
      console.log(param);
      console.log(param.bid);
      try {
        const couponResponse = await ReqBranchCoupon();
        console.log("쿠폰", couponResponse);
        if (couponResponse.status === 200) {
          const couponData = couponResponse.data.content;
          console.log("couponData", couponData);
          setCoupon(couponData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getCoupon();
  }, []);

  useEffect(() => {
    if (selectedType === null) {
      setSelectedType("review");
    }
  }, [selectedType]);

  //예약 조회
  useEffect(() => {
    async function getReservation() {
      try {
        const reservationResponse = await ReqBranchReservation(param.bid);
        console.log("예약", reservationResponse);
        if(reservationResponse.status === 200) {
          const reservationData = reservationResponse.data.content;
          console.log(reservationData);
          setReservation(reservationData);
        }
      } catch (err) {
        console.log(err);
      }finally {
        setIsLoading(false);
      }
    }
    getReservation();
  }, [])
  return (
    <>
      <GlobalStyle />
      <LoginAllDiv>
        <HeadBtn>
          <UpdateBtn
            onClick={() => {
              moveToBranchUpdate(param["*"]);
            }}
          >
            정보수정
          </UpdateBtn>

          <Logout moveToPage={moveToHome} clicked={null} />
        </HeadBtn>
        <h2> {bname} 관리 페이지</h2>

        {isLoading ? (
          <LoadDiv>
            <Loading />
          </LoadDiv>
        ) : (
          <MemberType>
            <TypeItem
              selected={selectedType === "review"}
              onClick={() => setSelectedType("review")}
            >
              <span>리뷰</span>
              <hr />
            </TypeItem>
            <TypeItem
              selected={selectedType === "coupon"}
              onClick={() => setSelectedType("coupon")}
            >
              <span>쿠폰</span>
              <hr />
            </TypeItem>
            <TypeItem
              selected={selectedType === "reservation"}
              onClick={() => setSelectedType("reservation")}
            >
              <span>예약</span>
              <hr />
            </TypeItem>
          </MemberType>
        )}
        {reviewEmpty && !couponEmpty && !reservationEmpty && <p>게시글을 찾을 수 없습니다.</p>}
        {selectedType === "review" && (
          <>{review && review.map((item) => <BranchReview key={item.rbId} item={item} />)}</>
        )}
        {couponEmpty && !reviewEmpty && !reservationEmpty && <p>쿠폰을 찾을 수 없습니다.</p>}
        {selectedType === "coupon" && (
          <>{coupon && coupon.map((list) => <CouponList key={list.cid} list={list} />)}</>
        )}
        {reservationEmpty && !reviewEmpty && !couponEmpty && <p>예약을 찾을 수 없습니다.</p>}
        {selectedType === "reservation" && (
          <>{reservation && reservation.map((list) => <BranchReservationList key={list.rvid} list={list} />)}</>
        )}
        {isLoading2 && page != pageData.totalPageNo && (
          <LoadDiv>
            <Loading />
          </LoadDiv>
        )}
      </LoginAllDiv>
    </>
  );
};

export default BranchHome;

const MemberType = styled.div`
  @media (min-width: 1171px) {
    width: 100%;
  }
  display: flex;
  justify-content: center;

  margin-top: 2vh;
  margin-bottom: 2.5vh;
`;

const TypeItem = styled.div`
  cursor: pointer;

  width: 30vw;

  text-align: center;
  font-weight: ${({ selected }) => (selected ? "bold" : "null")};
  font-size: 20px;

  color: ${({ selected }) => (selected ? "black" : "#a5a4a4")}; // 선택되었을 때 색상 변경

  & > hr {
    border: 1px solid ${({ selected }) => (selected ? "black" : "#a5a4a4")};
  }
`;


const UpdateBtn = styled.div`
  color: gray;
  display: flex;
  align-items: center;
  margin-right: 55vw;
`;

const HeadBtn = styled.div`
  display: flex;
  margin-top: 2vh;
  margin-bottom: 3vh;
`;

const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
