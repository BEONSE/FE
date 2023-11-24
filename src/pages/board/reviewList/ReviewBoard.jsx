import ReviewItem from "./ReviewItem";
import BackMove from "../../../components/backMove";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReqBranchNames } from "../../../apis/branch";
import { ReqReviewBoardList } from "../../../apis/reviewBoard";
import Loading from "../../../components/Loading";
import { tr } from "date-fns/locale";

const ReviewBoard = () => {
  const [branchNames, setBranchNames] = useState([]);
  const [selectBranch, setSelectBranch] = useState({
    branchName: "",
  });

  const [isLoad, setIsLoad] = useState(false);
  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 글 목록
  const [reviewList, setReviewList] = useState([]);

  // 지점 선택 handler
  const selectedHandler = (e) => {
    setSelectBranch({ branchName: e.target.value });
  };

  useEffect(() => {
    console.log(selectBranch.branchName);
  }, [selectBranch]);

  // 지점 이름 가져오기
  useEffect(() => {
    async function getBranchNames() {
      try {
        const namesResponse = await ReqBranchNames();
        console.log("이름", namesResponse);
        if (namesResponse.status === 200) {
          setBranchNames(namesResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBranchNames();
  }, []);

  useEffect(() => {
    if (selectBranch.branchName !== "") {
      getReviewList();
    }
  }, [selectBranch]);

  const getReviewList = async () => {
    setIsLoad(true);
    try {
      const response = await ReqReviewBoardList(selectBranch.branchName, 1);
      setReviewList(response.data.content);
      console.log(response.data);
      console.log(response.data.content);
    } catch (err) {
      console.log(err);
      if (err.response.data.statusCode === 404 || err.response.data.statusCode === 401) {
        setIsEmpty(true);
      }
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <>
      <BackMove />
      <Title>
        <h1>REVIEW</h1>
      </Title>
      <SelectBox>
        <select onChange={selectedHandler} value={selectBranch.branchName}>
          <option value={"defalut"}>지점 선택</option>
          {branchNames.map((name) => (
            <option value={`${name.bid}`}>{name.branchName}</option>
          ))}
        </select>
      </SelectBox>
      {isEmpty && <p>리뷰가 없습니다.</p>}
      {isLoad ? (
        <Load>
          <Loading />
          <p>리뷰 불러오는 중...</p>
        </Load>
      ) : (
        reviewList.map((review) => <ReviewItem review={review} key={review.rbId} />)
      )}
    </>
  );
};

export default ReviewBoard;

const Title = styled.div`
  text-align: center;
  margin-top: 4vh;
  margin-bottom: 3vh;
`;

// 셀렉트
const SelectBox = styled.div`
  width: 90vw;
  margin-bottom: 3vh;
  & > select {
    margin-left: 55%;
    font-family: "S-CoreDream-light";
    font-weight: bold;
    padding: 2%;
    width: 50%;
  }
`;

const Load = styled.div`
  text-align: center;
`;
