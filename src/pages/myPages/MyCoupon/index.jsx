import styled from "styled-components";
import HaveCouponItem from "./HaveCouponItem";
import React, { useEffect, useState } from "react";
import BackMove from "../../../components/backMove";
import { ReqCouponList, ReqUsedCouponList } from "../../../apis/coupon";

const MyCoupon = () => {
  // 필터 선택 state
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isCoupons, setIsCoupons] = useState([]);
  const [usedCoupons, setUsedCoupons] = useState([]);

  // defalut로 보유 쿠폰 가져오기
  useEffect(() => {
    getUnusedCoupons();
  }, []);

  // 사용, 미사용 선택 시 가져오기
  useEffect(() => {
    if (selectedFilter === "no") {
      getUnusedCoupons();
    } else if (selectedFilter === "yes") {
      getUsedCoupons();
    }
  }, [selectedFilter]);

  // 미사용 쿠폰 가져오기
  const getUnusedCoupons = async () => {
    try {
      const couponsResponse = await ReqCouponList();
      console.log("쿠폰", couponsResponse);
      if (couponsResponse.status === 200) {
        setIsCoupons(couponsResponse.data.content);
        setSelectedFilter("no");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 사용 쿠폰 가져오기
  const getUsedCoupons = async () => {
    try {
      const couponsResponse = await ReqUsedCouponList();
      console.log("사용쿠폰", couponsResponse);
      console.log("사용쿠폰", couponsResponse.data.content[0].branchName);
      if (couponsResponse.status === 200) {
        setUsedCoupons(couponsResponse.data.content);
        setSelectedFilter("yes");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BackMove />
      <HaveCouponAllDiv>
        <h1>쿠폰 현황 조회</h1>

        <SelectBtn>
          <FilterSpan filter={selectedFilter === "no"} onClick={() => setSelectedFilter("no")}>
            미사용
          </FilterSpan>
          <FilterSpan
            used={true}
            filter={selectedFilter === "yes"}
            onClick={() => setSelectedFilter("yes")}
          >
            사용
          </FilterSpan>
        </SelectBtn>
        {(selectedFilter === "no" ? isCoupons : usedCoupons).map((coupon) => (
          <HaveCouponItem key={coupon.cid} coupon={coupon} selectedFilter={selectedFilter} />
        ))}
      </HaveCouponAllDiv>
    </>
  );
};
export default MyCoupon;

// 쿠폰 현황 전체 div
const HaveCouponAllDiv = styled.div`
  margin: auto;
  width: 90vw;

  & > h1 {
    text-align: center;
    margin-top: 4vh;
    margin-bottom: 4vh;
  }
`;

// filter 버튼 div
const SelectBtn = styled.div`
  margin-bottom: 4vh;
`;

// filter 버튼 span
const FilterSpan = styled.span`
  cursor: pointer;
  background-color: ${(props) => (props.filter ? "#ffee88" : "#e8e8e8")};
  padding: 12px;
  border-radius: 30px 0px 0px 30px;
  display: inline-block;
  width: 100px;
  text-align: center;
  ${(props) =>
    props.used &&
    `
    border-radius: 0px 30px 30px 0px;
`}
`;
