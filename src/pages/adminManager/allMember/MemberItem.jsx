import styled from "styled-components";
import React from "react";

const MemberItem = ({ list }) => {

  return (
    <>
      <MemberGroup>
        <LeftInfo>
          <MemberContent>
            <h3>#{list.mid}</h3>
            <div>
              <p>ID : {list.nickname}</p>
              <p>회원 이름 : {list.name}</p>
            </div>
            <p>주소 : {list.address}</p>
          </MemberContent>
        </LeftInfo>
        <Date>
          신청 날짜 : {list.createdAt}
        </Date>
      </MemberGroup>
      <Hr />
    </>
  );
};

export default MemberItem;

/* 최상단 div Style */
const MemberGroup = styled.div`
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
  width: 90%;
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
  margin-left: 4vw;
  color: #8f8f8f;
`;

const Hr = styled.hr`
  margin-top: 1vh;
  margin-bottom: 1vh;
`