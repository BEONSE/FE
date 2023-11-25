import { useEffect } from "react";
import styled from "styled-components";
import PressCoupon from "../../../assets/presscoupon.png";
import FormCoupon from "../../../assets/formcoupon.png";

const CouponList = ({ list }) => {
  useEffect(() => {
    if (list) {
      console.log(list);
      console.log("c", list["type"]);
    }
  }, [list]);

  return (
    <>
      {list && (
        <CouponListForm>
          <CouponCid> #{list.cid} </CouponCid>
          <Coupons>
            {list.type === "고압 샤워 쿠폰" && <img src={PressCoupon} alt="formCoupon" />}
            {list.type === "폼 샤워 쿠폰" && <img src={FormCoupon} alt="formCoupon" />}
          </Coupons>
          <BranchCouponContent>
            <CouponUser> {list.name} </CouponUser>
            <CouponPaymentDate> {list.usedDate} </CouponPaymentDate>
          </BranchCouponContent>
        </CouponListForm>
      )}
    </>
  );
};

export default CouponList;

const CouponListForm = styled.div`
  width: 80vw;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  margin: auto;
  border-radius: 20px;
  margin-bottom: 3vh;
  padding: 5%;
`;
const Coupons = styled.div`
  width: 100%;
  height: 14vh;
  margin: auto;
  margin-bottom: 10vh;

  display: flex;
  justify-content: space-around;
  align-items: center;

  & > img {
    width: 100%;
    margin-top: 8vh;
  }
`;
const BranchCouponContent = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: antiquewhite;
  padding: 2%;
  width: 100%;
`;

const CouponCid = styled.div`
  margin-left: 3vw;
`;

const CouponUser = styled.div`
  margin-left: 3vw;
`;

const CouponPaymentDate = styled.div`
  margin-right: 3vw;
`;
