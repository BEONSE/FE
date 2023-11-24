import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Grade1 from "../../../assets/grade1.png";
import Grade2 from "../../../assets/grade2.png";
import Grade3 from "../../../assets/grade3.png";
import Sun from "../../../assets/sunnyborder.png";

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
            {detail.imageData ? (<img src={`data:image/png;base64,${detail.imageData}`} alt="userprofile" />) : (<img src={Sun} alt="기본 이미지" />)}
            <p>{detail.nickname}</p>
            <p>
              {detail.grade === 1 && <img src={Grade1} alt="grade1" />}
              {detail.grade === 2 && <img src={Grade2} alt="grade2" />}
              {detail.grade === 3 && <img src={Grade3} alt="grade3" />}
            </p>
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
    height: 8vh;
    width: 13vw;
    border-radius: 50%;
    margin-right: 2vw;
  }

  & > p {
    margin-right: 1vw;
    & > img {
      height: 2.5vh;
    }
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
