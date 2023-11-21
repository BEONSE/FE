import { Routes, Route } from "react-router-dom";
import BranchReview from "./review";
import CouponList from "./coupon";
import BranchUpdate from "./branchUpdate";
import { usePageMoving } from "../../components/usePageMoving";

const BranchManager = () => {
  const { moveToMyBranchReview, moveToBranchUpdate, moveToUseCoupons } = usePageMoving();
  return (
    <>
      <h1>지점사 관리 페이지</h1>
      <Routes>
        <Route path="/review" element={<BranchReview />} />
        <Route path="/coupons" element={<CouponList />} />
        <Route path="/mypage" element={<BranchUpdate />} />
      </Routes>
      <div>
        <p
          onClick={() => {
            moveToMyBranchReview();
          }}
        >
          리뷰
        </p>
      </div>
      <div>
        <p
          onClick={() => {
            moveToUseCoupons();
          }}
        >
          쿠폰
        </p>
      </div>
      <div>
        <p
          onClick={() => {
            moveToBranchUpdate();
          }}
        >
          정보 수정
        </p>
      </div>
    </>
  );
};

export default BranchManager;
