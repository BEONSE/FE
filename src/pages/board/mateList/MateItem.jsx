import styled from "styled-components";
import { usePageMoving } from "../../../components/usePageMoving";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";
import BackMove from "../../../components/backMove";
import React from "react";
/* 메이트 게시글 컴포넌트 */
const MateItem = ({ list }) => {
  const { moveToMateDetail } = usePageMoving();

  return (
    <>
      <MateGroup
        onClick={() => {
          moveToMateDetail(list.mbid);
        }}
      >
        <LeftInfo>
          <MateContent>
            <h2>
              <span>[{list.branchname}]</span>
              {list.title}
            </h2>
            <div>
              <p>{list.nickname}</p>
              <Grade>
                {list.grade === 1 && <img src={Grade1} alt="grade1" />}
                {list.grade === 2 && <img src={Grade2} alt="grade2" />}
                {list.grade === 3 && <img src={Grade3} alt="grade3" />}
              </Grade>
            </div>
          </MateContent>
          <Comment>
            <Count>{list.commentCount}</Count>
            <p>댓글</p>
          </Comment>
        </LeftInfo>

        <Date>
          <p>#{list.mbid}</p>
          {list.modifiedAt}
        </Date>
      </MateGroup>
      <hr />
    </>
  );
};

export default MateItem;

/* 최상단 div Style */
const MateGroup = styled.div`
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
const MateContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  & > h2 {
    margin-bottom: 1vh;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div {
    display: flex;
  }
`;

/* 등급 Style */
const Grade = styled.p`
  margin-left: 2vw;
  & > img {
    height: 2.5vh;
  }
`;

/* 날짜 Style */
const Date = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  color: #8f8f8f;
`;

/* 댓글 div Style */
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 12vw;
  text-align: center;
  background-color: #99e8f89d;
  border-radius: 10px;
  margin-left: auto;

  font-size: 14px;
`;

/* 댓글 개수 Style */
const Count = styled.p``;
