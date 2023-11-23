import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import GlobalStyle from "../../components/GlobalStyle";
import { LoginAllDiv } from "./branchUpdate";
import BranchReview from "./review";
import CouponList from "./coupon";
import { useEffect, useState } from "react";
import { usePageMoving } from "../../components/usePageMoving";
import { useParams } from "react-router-dom";
import { ReqProfile } from "../../apis/auth";
import { ReqBranchCoupon, ReqBranchReview } from "../../apis/branch";

const BranchHome = () => {
  const { moveToBranchUpdate } = usePageMoving();

  const param = useParams("bid");

  // 클릭 상태
  const [selectedType, setSelectedType] = useState(null);

  const [isBranchInfo, setIsBranchInfo] = useState();

  const [review, setReivew] = useState();

  const [coupon, setCoupon] = useState();

  // 내 프로필 요청하기
  useEffect(() => {
    async function getProfile() {
      try {
        const profileResponse = await ReqProfile();
        console.log(profileResponse);
        if (profileResponse.status === 200) {
          setIsBranchInfo({
            ...isBranchInfo,
            branchName: profileResponse.data.nickname,
          });
          console.log(isBranchInfo.branchName);
          console.log(profileResponse.data.nickname);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getProfile();
  }, {});

  //리뷰 가져오기
  useEffect(() => {
    async function getReview() {
      try {
        const reviewResponse = await ReqBranchReview(param["*"]);
        console.log(reviewResponse);
        if (reviewResponse.status === 200) {
          setReivew(reviewResponse.data.content);
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
      try {
        const couponResponse = await ReqBranchCoupon(param["*"]);
        console.log(couponResponse);
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

  return (
    <>
      <GlobalStyle />
      <LoginAllDiv>
        <UpdateBtn
          onClick={() => {
            moveToBranchUpdate(param["*"]);
          }}
        >
          정보수정
        </UpdateBtn>
        {isBranchInfo && <h2> {isBranchInfo.branchName} 관리 페이지</h2>}

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

const UpdateBtn = styled(CommonButton)`
  margin-top: 2vw;
  margin-bottom: 2vw;
  width: 16vw;
  display: flex;
  margin-left: auto;
  text-align: center;
  padding: auto;
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
