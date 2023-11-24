import styled from "styled-components";
import React from "react";
import { CommonButton } from "../../../components/CommonButton";

const BranchAcceptItem = ({ list }) => {

  return (
    <>
      <ResultMemberGroup>
        <LeftInfo>
          <MemberContent>
            <h3>#{list.bid}</h3>
            <div>
              <p>{list.nickname}</p>
              <p>대표 : {list.name}</p>
            </div>
            <p>가맹점 주소 : {list.address}</p>
          </MemberContent>
          <ResultDiv>
            <h3>{list.isApproval}</h3>
          </ResultDiv>
        </LeftInfo>
        <Date>
          신청 날짜 : {list.createdAt}
        </Date>
      </ResultMemberGroup>
      <Hr />
    </>
  );
};

export default BranchAcceptItem;

/* 최상단 div Style */
const ResultMemberGroup = styled.div`
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
const MemberContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;

  & > div {
    width: 60%;
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
  margin-left: 1.5vw;
  color: #8f8f8f;
`;

const Hr = styled.hr`
  margin-top: 1vh;
  margin-bottom: 1vh;
`

const ResultDiv = styled.div`
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
