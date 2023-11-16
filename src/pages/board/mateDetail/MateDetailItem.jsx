import styled from "styled-components";
import PersonImg from "../../../assets/person.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MateDetailItem = ({ detail }) => {
  const navigate = useNavigate();

  const [modifyDate, setModifyDate] = useState(false);

  // 수정 날짜 띄우기
  const diffModifyDate = () => {
    if (detail.createdAt !== detail.modifiedAt) {
      setModifyDate(true);
    }
  };

  useEffect(() => {
    diffModifyDate();
  }, []);
  return (
    <>
      <ContentGroup>
        <p
          onClick={() => {
            navigate(-1);
          }}
        >
          세차 메이트 게시판 {">"}
        </p>
        <h3>{detail.title}</h3>
        <Profile>
          <InnerProf>
            <img src={PersonImg} alt="userprofile" />
            <p>{detail.nickname}</p>
            <p>등급</p>
          </InnerProf>
          <TimeDiv>
            <p>작성일 {detail.createdAt}</p>
            {modifyDate && <p>수정일 {detail.modifiedAt}</p>}
          </TimeDiv>
        </Profile>
        <Content>
          <hr />
          <p>{detail.content}</p>
        </Content>
      </ContentGroup>
    </>
  );
};

export default MateDetailItem;

const ContentGroup = styled.div`
  margin-top: 4vh;
  padding: 5%;
  border: 1px solid;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.14);
  & > p {
    font-size: 14px;
    margin-bottom: 1vh;
    cursor: pointer;
  }

  & > p:hover {
    text-decoration: underline;
  }

  & > h3 {
    margin-bottom: 1.5vh;
  }
`;

const Profile = styled.div``;

const InnerProf = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1vh;
  & > img {
    height: 5vh;
    margin-right: 2vw;
  }

  & > p {
    margin-right: 1vw;
  }
`;

const TimeDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #aaaaaa;
`;

const Content = styled.div`
  & > hr {
    margin-top: 1vh;
    margin-bottom: 2vh;
    outline: none;
    border: 1px solid #aaaaaa;
  }
`;
