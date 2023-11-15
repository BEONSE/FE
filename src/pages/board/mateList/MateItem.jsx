import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* 메이트 게시글 컴포넌트 */
const MateItem = ({ list }) => {
  const navigate = useNavigate();

  const moveToReviewDetail = () => {
    navigate("1");
  };

  return (
    <>
      <MateGroup onClick={moveToReviewDetail}>
        <h2>{list.title}</h2>
        <div>
          <MateContent>
            <p>{list.nickname}</p>
            <Grade>등급</Grade>
          </MateContent>
          <Comment>
            <Count>{list.commentCount}</Count>
            <p>댓글</p>
          </Comment>
        </div>
        <Date>{list.modifiedAt}</Date>
      </MateGroup>
      <hr />
    </>
  );
};

export default MateItem;

/* 최상단 div Style */
const MateGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  margin-bottom: 1vh;

  padding-left: 2vw;
  padding-right: 2vw;

  & > h2 {
    margin-bottom: 1vh;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div {
    display: flex;
    justify-content: space-around;
  }
`;

/* 세부 내용 Style */
const MateContent = styled.div`
  width: 70%;
  display: flex;
`;

/* 등급 Style */
const Grade = styled.p`
  margin-left: 2vw;
`;

/* 날짜 Style */
const Date = styled.p`
  margin-top: 1vh;
  color: #8f8f8f;
  text-align: right;
`;

/* 댓글 div Style */
const Comment = styled.div`
  width: 15vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  text-align: center;
  background-color: #99e8f89d;
  border-radius: 10px;
  margin-left: auto;
`;

/* 댓글 개수 Style */
const Count = styled.p``;
