import { CommonButton } from "../../../components/CommonButton";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReqBranchNames } from "../../../apis/branch";
import { ReqUseCoupon } from "../../../apis/coupon";
import { usePageMoving } from "../../../components/usePageMoving";
import FormCoupon from "../../../assets/formcoupon.png";
import PressCoupon from "../../../assets/presscoupon.png";
import ModalMyCoupon from "./ModalMyCoupon";

const HaveCouponItem = ({ coupon, selectedFilter }) => {
  const { moveToWriteReview } = usePageMoving();
  const [checkChooseBranch, setCheckChooseBranch] = useState(false);
  const [useCoupon, setUseCoupon] = useState(false);

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
        console.log("이름", namesResponse);
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
      if (useReponse.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 사용하기 클릭 handler
  const clickBtnHandler = () => {
    if (selectedFilter === "no") {
      if (selectBranch.branchName !== "") {
        setUseCoupon(!useCoupon);
      } else {
        setCheckChooseBranch(!checkChooseBranch);
      }
    } else if (selectedFilter === "yes") {
      // 리뷰 쓰기로 이동
      moveToWriteReview(coupon.cid, coupon.branchName);
    }
  };

  return (
    <>
      <GetCouponItem>
        <ImageBox>
          {coupon.type === "폼 샤워 쿠폰" ? (
            <img src={FormCoupon} alt="coupon" />
          ) : (
            <img src={PressCoupon} alt="coupon" />
          )}
        </ImageBox>
        <SelectBox>
          {selectedFilter === "no" && (
            <select onChange={selectedHandler} value={selectBranch.branchName}>
              <option value={"default"}>지점 선택</option>
              {branchNames.map((name) => (
                <option value={`${name.branchName}`}>{name.branchName}</option>
              ))}
            </select>
          )}
        </SelectBox>

        <UsedBranchname>
          {coupon.branchName && (
            <>
              <p>사용 지점 - </p>
              <p>&nbsp;BEONSE [{coupon.branchName}]</p>
            </>
          )}
        </UsedBranchname>

        <UsedBtn used={coupon.used} onClick={clickBtnHandler}>
          {!coupon.used ? (selectedFilter === "no" ? "사용하기" : "리뷰쓰기") : "리뷰 작성 완료"}
        </UsedBtn>
      </GetCouponItem>
      {checkChooseBranch && (
        <ModalMyCoupon
          content={"지점을 선택해주세요."}
          modalState={setCheckChooseBranch}
          reqApi={null}
        />
      )}
      {useCoupon && (
        <ModalMyCoupon
          content={`${selectBranch.branchName}에서 쿠폰을 사용하시겠습니까?`}
          modalState={setUseCoupon}
          reqApi={patchCoupon}
        />
      )}
    </>
  );
};

export default HaveCouponItem;

// 전체 div
const GetCouponItem = styled.div`
  width: 100%;
  margin-bottom: 2vh;
  border: 1px solid #ececec;
  border-radius: 20px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.146);
  padding: 5%;
`;

// 셀렉트
const SelectBox = styled.div`
  & > select {
    margin-left: 50%;
    font-family: "S-CoreDream-light";
    font-weight: bold;
    padding: 2%;
    width: 50%;

    & :focus {
      outline: none;
      border: 1px solid #99eeff;
    }
  }
`;

// 버튼
const UsedBtn = styled(CommonButton)`
  margin-top: 3vh;
  font-size: 18px;
  background-color: ${(props) => (props.used ? "#ccc" : "")};
  pointer-events: ${(props) => (props.used ? "none" : "auto")};
`;

// 쿠폰 이미지
const ImageBox = styled.div`
  width: 80vw;

  & > img {
    width: 100%;
  }
`;

// 사용 지점
const UsedBranchname = styled.div`
  width: 80%;
  display: flex;

  & > p {
    font-weight: bold;
  }
`;
