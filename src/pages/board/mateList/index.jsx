import styled from "styled-components";
import MateItem from "./MateItem";
import { useNavigate, Route, Routes } from "react-router";
import { CommonButton } from "../../../components/CommonButton";
import BoardWrite from "../boardWrite";
import { usePageMoving } from "../../../components/usePageMoving";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../AppContext";
import { ReqMateBoardList } from "../../../apis/mateBoard";
import Loading from "../../../components/Loading";

/* 메이트 게시판 List 컴포넌트 */
const MateList = () => {
  const { moveToWrite, moveToLogin } = usePageMoving();

  const appContext = useContext(AppContext);

  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 글 목록
  const [mateList, setMateList] = useState([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // 글작성 click handler
  const writeBtnHandler = () => {
    if (!appContext.accessToken) {
      const result = window.confirm(
        "로그인 후 이용하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?",
      );
      if (result) {
        moveToLogin();
      }
    } else {
      moveToWrite();
    }
  };

  useEffect(() => {
    async function getMateList() {
      try {
        const response = await ReqMateBoardList();
        setMateList(response.data);
      } catch (err) {
        console.log(err.response.status);
        if (err.response.status === 404 || err.response.status === 401) {
          setIsEmpty(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getMateList();
  }, []);

  return (
    <>
      <Routes>
        <Route path="write" element={<BoardWrite />} />
      </Routes>
      <PageTitle>👬 세차 메이트 👬</PageTitle>
      <Button onClick={writeBtnHandler}>글쓰기</Button>
      <hr />
      {isLoading ? (
        <LoadDiv>
          <Loading />
        </LoadDiv>
      ) : (
        <AllMateListDiv>
          {isEmpty && <p>게시글을 찾을 수 없습니다.</p>}
          {mateList.map((list) => (
            <MateItem key={list.mbid} list={list} />
          ))}
        </AllMateListDiv>
      )}
      <H4>더보기</H4>
    </>
  );
};

export default MateList;

// 목록 전체 div
const AllMateListDiv = styled.div`
  width: 90vw;
  margin: auto;
`;

/* 페이지 종류 Style */
const PageTitle = styled.h2`
  margin-top: 3vh;
  margin-bottom: 1vh;
  text-align: center;
`;

/* 글작성 버튼 Style */
const Button = styled(CommonButton)`
  width: 20vw;
  font-size: 14px;
  margin-top: 1vh;
  margin-bottom: 1vh;
  margin-left: 75vw;
`;

/* h4 Style */
const H4 = styled.h4`
  text-align: center;
  margin-bottom: 2vh;
`;

const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
