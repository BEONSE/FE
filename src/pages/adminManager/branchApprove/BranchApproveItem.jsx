import styled from "styled-components";
import React from "react";
import { CommonButton } from "../../../components/CommonButton";
import { ReqUseCoupon } from "../../../apis/coupon";

const BranchApproveItem = ({ list }) => {

  // const acceptBtn = async () => {
  //   try {
  //     const useReponse = await ReqUseCoupon(coupon.cid, selectBranch);
  //     console.log(useReponse);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //
  // // 사용하기 클릭 handler
  // const clickBtnHandler = () => {
  //   if (selectedFilter === "no") {
  //     if (selectBranch.branchName !== "") {
  //       alert(`${selectBranch.branchName}에서 쿠폰을 사용하시겠습니까?`);
  //       acceptBtn();
  //     } else {
  //       alert("지점을 선택해주세요.");
  //     }
  //   } else if (selectedFilter === "yes") {
  //     // 리뷰 쓰기로 이동
  //     moveToWriteReview(coupon.cid, coupon.branchName);
  //   }
  // };

  return (
    <>
      <ApproveGroup>
        <LeftInfo>
          <BranchContent>
            <h3>#{list.bid}</h3>
            <div>
              <p>{list.nickname}</p>
              <p>대표 : {list.name}</p>
            </div>
            <p>가맹점 주소 : {list.address}</p>
          </BranchContent>
          <BtnDiv>
            <AcceptBtn>승인</AcceptBtn>
            <AcceptBtn>거절</AcceptBtn>
          </BtnDiv>
        </LeftInfo>
        <Date>
          신청 날짜 : {list.createdAt}
        </Date>
      </ApproveGroup>
      <Hr />
    </>
  );
};

export default BranchApproveItem;

const BtnDiv = styled.div`
  width: 20vw;
  display: flex;
  justify-content: space-around;
`;

const AcceptBtn = styled(CommonButton)`
  width: 7vw;
  /* 
   height: 3vh; */
  padding: 3px;

  & + & {
    background-color: gray;
  }
`;

/* 최상단 div Style */
const ApproveGroup = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  margin-bottom: 1vh;

  padding-left: 2vw;
  padding-right: 2vw;

  & > div {
    display: flex;
    justify-content: space-around;
  }
`;

const LeftInfo = styled.div`
  display: flex;
`;

/* 세부 내용 Style */
const BranchContent = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;

  & > div {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1vh;
  }
`;

/* 날짜 Style */
const Date = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  margin-left: 2.5vw;
  color: #8f8f8f;
`;

const Hr = styled.hr`
  margin-top: 1vh;
  margin-bottom: 1vh;
`