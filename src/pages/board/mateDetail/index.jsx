import { styled } from "styled-components";
import MateDetailItem from "./MateDetailItem";
import MateComment from "./MateComment";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ReqMateBoardComment, ReqMateBoardDetail } from "../../../apis/mateBoard";
import CommentForm from "../CommentForm/CommentForm";
import BackMove from "../../../components/backMove";
import Loading from "../../../components/Loading";

const MateDetail = () => {
  const mbid = useParams("id"); // pathVariable 가져오기
  const [detail, setDetail] = useState({}); // 게시글 정보
  const [comment, setComment] = useState([]); // 댓글 정보
  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [pageData, setPageData] = useState("");

  // 페이지
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    setIsLoading2(true);
    try {
      const response = await ReqMateBoardComment(mbid.id, page + 1);
      if (response.data.content.length === 0) {
        setIsEmpty(true);
      } else {
        setComment([...comment, ...response.data.content]);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading(false);
    }
    setIsLoading2(false);
  };

  const throttle = (func, delay) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // 스크롤이 맨 아래에 도달하면 새로운 데이터 로드
      loadMore();
    }
  };

  useEffect(() => {
    const handleScrollThrottle = throttle(handleScroll, 20); // 쓸데없이 많은 이벤트 호출을 방지하기 위한 스크롤 쓰로틀링

    window.addEventListener("scroll", handleScrollThrottle);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, [handleScroll]);

  useEffect(() => {
    // 게시글 상세 요청
    async function getDetail() {
      try {
        const detailResponse = await ReqMateBoardDetail(mbid.id);
        setDetail(detailResponse.data);
      } catch (err) {
        console.log("게시글 불러오기 실패");
      }
    }

    // 게시글 상세 댓글 요청
    async function getComment() {
      try {
        const commentResponse = await ReqMateBoardComment(mbid.id);
        setComment(commentResponse.data.content);
        setPageData(commentResponse.data);
        console.log("댓글", commentResponse.data.content);
      } catch (err) {
        console.log(err);
        console.log(err.response.data.statusCode);
        console.log(err.response.data.errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    getDetail();
    getComment();
  }, [mbid]);

  return (
    <>
      <BackMove />
      {isLoading ? (
        <LoadDiv>
          <Loading />
        </LoadDiv>
      ) : (
        <GroupDiv>
          <MateDetailItem detail={detail} />
          <CommentInfo>
            <h3>댓글</h3>
            <p>총 {pageData.totalRows} 개</p>
          </CommentInfo>
          <hr />
          <br />
          <CommentForm id={mbid.id} />
          {comment.map((item) => (
            <MateComment key={item.mcid} comment={item} boardWriter={detail.nickname} />
          ))}
          {isLoading2 && page != pageData.totalPageNo &&
            <LoadDiv>
              <Loading />
            </LoadDiv>
          }
        </GroupDiv>
      )}
    </>
  );
};

export default MateDetail;

const GroupDiv = styled.div`
  width: 90vw;
  margin: auto;

  & > hr {
    outline: none;
    border: 1px solid #ececec;
  }
`;

// 댓글 개수
const CommentInfo = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 2vh;
  margin-bottom: 1vh;
  margin-left: 2vw;

  & > p {
    margin-left: 3vw;
  }
`;

const LoadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
