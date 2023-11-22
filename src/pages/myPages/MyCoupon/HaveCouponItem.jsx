import { CouponItem } from "../../coupon/PurchaseCoupon";
import { CommonButton } from "../../../components/CommonButton";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReqBranchNames } from "../../../apis/branch";
import { ReqUseCoupon } from "../../../apis/coupon";
import { usePageMoving } from "../../../components/usePageMoving";

const HaveCouponItem = ({ coupon, selectedFilter }) => {
  const { moveToWriteReview } = usePageMoving();

  const [selectBranch, setSelectBranch] = useState({
    branchName: "",
  });
  const [branchNames, setBranchNames] = useState([]);

  // 지점 선택 handler
  const selectedHandler = (e) => {
    setSelectBranch({ branchName: e.target.value });
  };

  // 지점 이름 가져오기
  useEffect(() => {
    async function getBranchNames() {
      try {
        const namesResponse = await ReqBranchNames();
        console.log(namesResponse);
        if (namesResponse.status === 200) {
          setBranchNames(namesResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBranchNames();
  }, []);

  useEffect(() => {
    console.log(selectBranch.branchName);
  }, [selectBranch]);

  const patchCoupon = async () => {
    try {
      const useReponse = await ReqUseCoupon(coupon.cid, selectBranch);
      console.log(useReponse);
    } catch (err) {
      console.log(err);
    }
  };

  // 사용하기 클릭 handler
  const clickBtnHandler = () => {
    if (selectedFilter === "no") {
      if (selectBranch.branchName !== "") {
        alert(`${selectBranch.branchName}에서 쿠폰을 사용하시겠습니까?`);
        patchCoupon();
      } else {
        alert("지점을 선택해주세요.");
      }
    } else if (selectedFilter === "yes") {
      // 리뷰 쓰기로 이동
      moveToWriteReview(coupon.cid, coupon.branchName);
    }
  };

  return (
    <>
      <CouponItem>
        {selectedFilter === "no" && (
          <select onChange={selectedHandler} value={selectBranch.branchName}>
            <option value={"defalut"}>지점 선택</option>
            {branchNames.map((name) => (
              <option value={`${name}`}>{name}</option>
            ))}
          </select>
        )}
        <h1>{coupon.type}</h1>

        {coupon.branchName && (
          <>
            <p>사용 지점</p>
            <p>{coupon.branchName}</p>
          </>
        )}

        <UsedBtn used={coupon.used} onClick={clickBtnHandler}>
          {!coupon.used ? (selectedFilter === "no" ? "사용하기" : "리뷰쓰기") : "리뷰 작성 완료"}
        </UsedBtn>
      </CouponItem>
    </>
  );
};

export default HaveCouponItem;

const UsedBtn = styled(CommonButton)`
  margin-top: 3vh;
  font-size: 18px;
  background-color: ${(props) => (props.used ? "#ccc" : "")};
  pointer-events: ${(props) => (props.used ? "none" : "auto")};
`;
