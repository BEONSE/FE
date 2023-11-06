import styled from "styled-components";

/* 메이트 게시글 컴포넌트 */
const MateItem = () => {
  return (
    <>
      <MateGroup>
        <hr />
        <h2>제목</h2>
        <MateContent>
          <p>작성자</p>
          <Grade>등급</Grade>
          <Date>2023.12.12</Date>
        </MateContent>
        <Comment>
          <Count>0</Count>
          <p>댓글</p>
        </Comment>
      </MateGroup>
    </>
  );
};

export default MateItem;

/* 최상단 div Style */
const MateGroup = styled.div`
  margin: 0 3vw 0 3vw;

  & > hr {
    margin-bottom: 2vh;
  }

  & > h2 {
    margin-left: 2vw;
    margin-bottom: 1vh;
  }
`;

/* 세부 내용 Style */
const MateContent = styled.div`
  display: flex;
  margin-left: 2vw;
`;

/* 등급 Style */
const Grade = styled.p`
  margin-left: 6vw;
`;

/* 날짜 Style */
const Date = styled.p`
  margin-left: 18vw;
`;

/* 댓글 div Style */
const Comment = styled.div`
  width: 20vw;
  height: 8vh;
  text-align: center;
  margin: -8vh 3vw 2vh 73vw;
  background-color: #b6b6b6;
`;

/* 댓글 개수 Style */
const Count = styled.p`
  padding-top: 0.5vh;
  margin-bottom: 1.5vh;
`;
