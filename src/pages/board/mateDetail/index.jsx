import { styled } from "styled-components";
import MateDetailItem from "./MateDetailItem";
import MateComment from "./MateComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReqMateBoardComment, ReqMateBoardDetail } from "../../../apis/mateBoard";
import CommentForm from "../CommentForm/CommentForm";

const MateDetail = () => {
  const mbid = useParams("id"); // pathVariable 가져오기
  const [detail, setDetail] = useState({}); // 게시글 정보
  const [comment, setComment] = useState([]); // 댓글 정보

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

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
        setComment(commentResponse.data);
        console.log("댓글", commentResponse.data);
      } catch (err) {
        console.log(err);
        console.log(err.response.data.statusCode);
        console.log(err.response.data.errorMessage);
      }
    }

    getDetail();
    getComment();
  }, [mbid]);

  return (
    <>
      <GroupDiv>
        <MateDetailItem detail={detail} />
        <CommentInfo>
          <h3>댓글</h3>
          <p>총 {comment.length} 개</p>
        </CommentInfo>
        <hr />
        <br />
        {comment.map((item) => (
          <MateComment comment={item} />
        ))}
        <CommentForm id={mbid.id} />
      </GroupDiv>
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
