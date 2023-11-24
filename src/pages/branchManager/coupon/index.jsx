import { useEffect } from "react";
import styled from "styled-components";

const CouponList = ({ list }) => {
  useEffect(() => {
    if (list) {
      console.log(list);
      console.log("c", list["type"]);
    }
  }, [list]);

  if (list.type === "고압 샤워 쿠폰") {
    list.type = "고압 세차";
  }
  if (list.type === "폼 샤워 쿠폰") {
    list.type = "폼 세차";
  }

  return (
    <>
      {list && (
        <CouponListForm>
          <hr />
          <BranchCouponContent>
            <CouponCid> {list.cid} </CouponCid>
            <CouponType> {list.type} </CouponType>
            <CouponUser> {list.name} </CouponUser>
            <CouponPaymentDate> {list.paymentDate} </CouponPaymentDate>
          </BranchCouponContent>
        </CouponListForm>
      )}
    </>
  );
};

export default CouponList;

const CouponListForm = styled.div``;

const BranchCouponContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  width: 20%;
  margin-left: 5vw;
  margin-right: 5vw;
`;

const CouponPaymentDate = styled.div`
  width: 40%;
  margin-left: 4vw;
  margin-right: 5vw;
`;
