import styled from "styled-components";

const MyMateItem = () => {
  return (
    <>
      <MateGroup>
        <GroupLeft>
          <MateTitle>
            <h3>제목</h3>
          </MateTitle>
          <MateContent>
            <p>작성자</p>
            <Grade>지점</Grade>
            <Date>2023.12.12</Date>
          </MateContent>
        </GroupLeft>

        <GroupRight>
          <Comment>
            <Count>0</Count>
            <p>댓글</p>
          </Comment>
        </GroupRight>
      </MateGroup>
    </>
  );
};

export default MyMateItem;

/* 최상단 div Style */
const MateGroup = styled.div`
  width: 80%;
  display: flex;
  margin: 0 3vw 0 3vw;
  justify-content: space-between;
  align-items: center;

  & > hr {
    margin-bottom: 2vh;
  }

  & > h2 {
    margin-left: 2vw;
    margin-bottom: 1vh;
  }
`;

//제목
const MateTitle = styled.div`
  h3 {
    margin-left: 15%;
  }
`;

const GroupLeft = styled.div`
  display: grid;
`;

const GroupRight = styled.div`
  margin-bottom: 2%;
`;
/* 세부 내용 Style */
const MateContent = styled.div`
  display: flex;
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
  width: 10vw;
  height: 8vh;
  text-align: center;
  background-color: #b6b6b6;
`;

/* 댓글 개수 Style */
const Count = styled.p`
  padding-top: 0.5vh;
  margin-bottom: 1.5vh;
`;
