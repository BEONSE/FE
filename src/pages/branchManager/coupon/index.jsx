import { useEffect } from "react";
import styled from "styled-components";

const CouponList = ({ item }) => {
  useEffect(() => {
    if (item) {
      console.log(item);
      console.log("c", item["type"]);
    }
  }, [item]);

  return (
    <>
      <CouponListForm>
        <BranchCouponHeader>
          <p>번호</p>
          <p>쿠폰 종류</p>
          <p>회원명</p>
          <p>사용날짜</p>
        </BranchCouponHeader>
        <BranchCouponContent>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </BranchCouponContent>
      </CouponListForm>
    </>
  );
};

export default CouponList;

const CouponListForm = styled.div`
  display: grid;
  justify-items: center;
  margin-bottom: 3rem;
`;

const BranchCouponHeader = styled.div`
  display: flex;
  & > p {
    margin: 5vw;
  }
`;

const BranchCouponContent = styled.div``;
