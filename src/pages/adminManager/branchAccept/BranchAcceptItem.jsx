import styled from "styled-components";
import React from "react";

const BranchAcceptItem = ({ list }) => {

  return (
    <>
      <ResultMemberGroup>
        <LeftInfo>
          <MemberContent>
            <p>#{list.bid}</p>
            <div>
              <b><p>{list.nickname}</p></b>
              <p>대표 : {list.name}</p>
              <p>가맹점 주소 : </p>
              <p>{list.address}</p>
            </div>
          </MemberContent>
          <ResultDiv>
            <H3 status={list.isApproval}>{list.isApproval}</H3>
          </ResultDiv>
        </LeftInfo>
        <Date>
          신청 날짜 : {list.createdAt}
        </Date>
      </ResultMemberGroup>
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
  margin-bottom: 3vh;

  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.146);
  padding: 1vh 2vw 1vh 2vw;

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

  & > p {
    margin-bottom: 1vh;
  }

  & > div {
    display: grid;
  }
`;

/* 날짜 Style */
const ResultDiv = styled.div`
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: space-around;

`;

const H3 = styled.h3`
  color: ${({ status }) => (status === '가입 승인' ? '#002fe6' : '#ff0202')}
`

const Date = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  margin-left: 1.5vw;
  color: #8f8f8f;
`;

