import { useParams } from "react-router-dom";
import BranchReview from "./review";
import CouponList from "./coupon";
import BranchUpdate from "./branchUpdate";
import React, { useEffect, useState } from "react";
import { LoginAllDiv } from "../login";
import { ReqBranchCoupon, ReqBranchReview } from "../../apis/branch";
import { usePageMoving } from "../../components/usePageMoving";
import { ReqProfile } from "../../apis/auth";
import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";

const BranchManager = ({ setHideHeaderFooter }) => {
  const { moveToBranchUpdate } = usePageMoving();

  const param = useParams("bid");

  const [isBranchInfo, setIsBranchInfo] = useState({});

  const [review, setReview] = useState([]);

  const [coupon, setCoupon] = useState([]);

  useEffect(() => {
    console.log(param["*"]);
    console.log("q", review);
    console.log("c", coupon);
  }, []);

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
        }
      } catch (err) {
        console.log(err);
      }
    }
    getProfile();
  }, []);

  //리뷰 가져오기
  useEffect(() => {
    async function getReview() {
      try {
        const reviewResponse = await ReqBranchReview(param["*"]);
        console.log(reviewResponse);
        if (reviewResponse.status === 200) {
          setReview(reviewResponse.data.content);
          setIsBranchInfo({
            ...isBranchInfo,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    getReview();
  }, {});

  //쿠폰 가져오기
  useEffect(() => {
    async function getCoupon() {
      try {
        const couponResponse = await ReqBranchCoupon(param["*"]);
        console.log(couponResponse);
        if (couponResponse === 200) {
          setCoupon(couponResponse.data.content);
          setIsBranchInfo({
            ...isBranchInfo,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCoupon();
  }, {});

  // 클릭 상태
  const [selectedType, setSelectedType] = useState(null);

  // Header Footer 숨기기
  useEffect(() => {
    setHideHeaderFooter(true);
    return () => setHideHeaderFooter(false);
  }, [setHideHeaderFooter]);

  useEffect(() => {
    if (selectedType === null) {
      setSelectedType("review");
    }
  }, [selectedType]);

  return (
    <>
      <LoginAllDiv>
        <UpdateBtn
          onClick={() => {
            moveToBranchUpdate();
            <BranchUpdate />;
          }}
        >
          정보수정
        </UpdateBtn>
        <h2>BEONSE {isBranchInfo.branchName} 관리 페이지</h2>
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
        {selectedType === "review" ? <BranchReview /> : <CouponList />}
        {review && review.map((item) => <BranchReview key={item.rbId} item={item} />)}
        {coupon && coupon.map((item) => <CouponList key={item.cid} item={item} />)}
      </LoginAllDiv>
    </>
  );
};

export default BranchManager;

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
  width: 16vw;
  display: flex;
  margin-left: auto;
  text-align: center;
  padding: auto;
`;
