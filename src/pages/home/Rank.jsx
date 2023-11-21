import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import { reqRank } from "../../apis/rank";

const Rank = () => {
  const appContext = useContext(AppContext);

  // 글이 없을 경우
  const [isEmpty, setIsEmpty] = useState(false);

  // 글 목록
  const [rank, setRank] = useState([]);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRank() {
      try {
        const response = await reqRank();
        setRank(response.data);
      } catch (err) {
        if (err.response.data.statusCode === 404 || err.response.data.statusCode === 401) {
          setIsEmpty(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getRank();
  }, []);
  return (
    <>
      <RackDiv>
        <h2>🏆 이달의 세차왕 🏆</h2>
        <p>{rank.nickname}</p>
      </RackDiv>
    </>
  );
};

export default Rank;

const RackDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
  border-radius: 20px;

  padding: 4vh;

  & > p {
    font-size: 20px;
    letter-spacing: 6px;
    font-weight: bold;

    margin-top: 1.5vh;
  }
`;
