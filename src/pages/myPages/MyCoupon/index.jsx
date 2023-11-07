import styled from "styled-components";
import HaveCouponItem from "./HaveCouponItem";
import { useState } from "react";

const MyCoupon = () => {
  // 필터 선택 state
  const [selectedFilter, setSelectedFilter] = useState(null);
  return (
    <>
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
        <HaveCouponItem />
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
