import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import GlobalStyle from "../../components/GlobalStyle";
import { LoginAllDiv } from "./branchUpdate";
import BranchReview from "./review";
import CouponList from "./coupon";
import { useContext, useEffect, useState } from "react";
import { usePageMoving } from "../../components/usePageMoving";
import { useParams } from "react-router-dom";
import { ReqBranchCoupon, ReqBranchInfo, ReqBranchReview } from "../../apis/branch";
import { ReqBranchName } from "../../apis/reservation";
import { removeAuthHeader } from "../../apis/axiosConfig";
import appContext from "../../AppContext";
import AppContext from "../../AppContext";

const BranchHome = () => {

  const appContext = useContext(AppContext);

  const { moveToBranchUpdate, moveToHome } = usePageMoving();

  const param = useParams("bid");

  // 클릭 상태
  const [selectedType, setSelectedType] = useState(null);

  // branch이름 가져오기
  const [bname, setBname] = useState("");

  const [review, setReview] = useState();

  const [coupon, setCoupon] = useState();

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
        const reviewResponse = await ReqBranchReview(param["*"]);
        console.log(reviewResponse);
        if (reviewResponse.status === 200) {
          setReview(reviewResponse.data.content);
        }
      } catch (err) {
        console.log(err);
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
        console.log("쿠폰",couponResponse);
        if (couponResponse.status === 200) {
          const couponData = couponResponse.data;
          console.log("couponData", couponData);
          setCoupon(couponData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCoupon();
  }, []);

  useEffect(() => {
    if (selectedType === null) {
      setSelectedType("review");
    }
  }, [selectedType]);

  const handleLogout = (e) => {
    removeAuthHeader();

    appContext.setAccessToken("");
    appContext.setRefreshToken("");

    moveToHome();
  }
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

        <LogoutBtn
          onClick={() => {
            handleLogout();
          }}
        >로그아웃
        </LogoutBtn>
        </HeadBtn>
        <h2> {bname} 관리 페이지</h2>

        <MemberType>
          <TypeItem selected={selectedType === "review"} onClick={() => setSelectedType("review")}>
            <span>리뷰</span>
            <hr />
          </TypeItem>
          <TypeItem selected={selectedType === "coupon"} onClick={() => setSelectedType("coupon")}>
            <span>쿠폰</span>
            <hr />
          </TypeItem>
        </MemberType>
        {selectedType === "review" && (
          <>{review && review.map((item) => <BranchReview key={item.rbId} item={item} />)}</>
        )}
        {selectedType === "coupon" && (
          <>
            <BranchCouponHeader>
              <CouponCid> No. </CouponCid>
              <CouponType> 쿠폰종류 </CouponType>
              <CouponUser> 회원명 </CouponUser>
              <CouponPaymentDate> 사용날짜 </CouponPaymentDate>
            </BranchCouponHeader>
          </>
        )}
        {selectedType === "coupon" && (
          <>{coupon && coupon.map((list) => <CouponList key={list.cid} list={list} />)}</>
        )}
      </LoginAllDiv>
    </>
  );
};

export default BranchHome;

const MemberType = styled.div`
  @media (min-width: 1171px) {
    width: 30%;
  }
  display: flex;
  justify-content: center;

  margin-top: 2vh;
  margin-bottom: 2.5vh;
`;

const TypeItem = styled.div`
  cursor: pointer;

  width: 40vw;

  text-align: center;
  font-weight: ${({ selected }) => (selected ? "bold" : "null")};
  font-size: 20px;

  color: ${({ selected }) => (selected ? "black" : "#a5a4a4")}; // 선택되었을 때 색상 변경

  & > hr {
    border: 1px solid ${({ selected }) => (selected ? "black" : "#a5a4a4")};
  }
`;

const LogoutBtn = styled(CommonButton)`
  margin-top: 2vw;
  margin-bottom: 2vw;
  width: 16vw;
  display: flex;
  margin-left: 4vw;
  text-align: center;
  //padding: auto;
  justify-content: center;
`;

const BranchCouponHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const CouponCid = styled.div`
  width: 5%;
  margin-left: 5vw;
  margin-right: 5vw;
`;

const CouponType = styled.div`
  width: 35%;
  margin-left: 5vw;
  margin-right: 5vw;
`;

const CouponUser = styled.div`
  width: 25%;
  margin-left: 5vw;
  margin-right: 5vw;
`;

const CouponPaymentDate = styled.div`
  width: 35%;
  margin-left: 6vw;
  margin-right: 5vw;
`;

const UpdateBtn = styled.div`
  color: gray;
  display: flex;
  align-items: center;
  margin-right: 55vw;
`;

const HeadBtn = styled.div`
  display: flex;
  `;