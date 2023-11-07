import { CouponItem } from "../../coupon/PurchaseCoupon";
import { CommonButton } from "../../../components/CommonButton";
import styled from "styled-components";

const HaveCouponItem = () => {
  return (
    <>
      <CouponItem>
        <div>
          <p>BEONSE</p>
          <p>XX점</p>
        </div>
        <h1>고압 샤워 쿠폰</h1>
        <UsedBtn>사용하기</UsedBtn>
      </CouponItem>
      <CouponItem>
        <div>
          <p>BEONSE</p>
          <p>XX점</p>
        </div>
        <h1>폼 샤워 쿠폰</h1>
        <UsedBtn>리뷰쓰기</UsedBtn>
      </CouponItem>
    </>
  );
};

export default HaveCouponItem;

const UsedBtn = styled(CommonButton)`
  margin-top: 3vh;
  font-size: 18px;
`;
