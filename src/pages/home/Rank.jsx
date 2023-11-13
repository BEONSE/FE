import styled from "styled-components";

const Rank = () => {
  return (
    <>
      <RackDiv>
        <h2>🏆 이달의 세차왕 🏆</h2>
        <p>김세차</p>
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
