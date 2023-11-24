import styled from "styled-components";
import React, { useState } from "react";
import { CommonButton } from "../../../components/CommonButton";
import { ReqAcceptMember, ReqRejectMember } from "../../../apis/auth";

const BranchApproveItem = ({ list }) => {

  const acceptBtnHandle = async () => {
    try {
      const acceptResponse = await ReqAcceptMember(list.mid);
      console.log(acceptResponse);
      if (acceptResponse.status === 200) {
        alert('가입이 승인되었습니다.')
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const rejectBtnHandle = async () => {
    try {
      const rejectResponse = await ReqRejectMember(list.mid);
      console.log(rejectResponse);
      if (rejectResponse.status === 200) {
        alert('가입이 거절되었습니다.')
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }

  };

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
            <AcceptBtn onClick={acceptBtnHandle}>승인</AcceptBtn>
            <AcceptBtn onClick={rejectBtnHandle}>거절</AcceptBtn>
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
`;