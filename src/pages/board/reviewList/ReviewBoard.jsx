import ReviewItem from "./ReviewItem";
import SearchIcon from "../../../assets/magnifier.png";
import BackMove from "../../../components/backMove";
import styled from "styled-components";

const ReviewBoard = () => {
  return (
    <>
      <BackMove />
      <Title>
        <h2>XX점</h2>
        <h2>REVIEW</h2>
      </Title>
      <SearchBar>
        <input placeholder="지점 검색하기" />
        <img src={SearchIcon} alt="SearchIconImage" />
      </SearchBar>
      <ReviewItem />
    </>
  );
};

export default ReviewBoard;

const Title = styled.div`
  text-align: center;
  margin-top: 4vh;
  margin-bottom: 5vh;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  border: 1px solid #a0a0a0;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 5vh;
  @media (max-width: 1170px) {
    width: 90vw;
    & > input {
      font-family: "S-CoreDream-light", sans-serif;
      font-size: 16px;

      width: 50%;
      height: 30px;

      border: none;
    }

    & > img {
      cursor: pointer;
      width: 30px;
    }
  }
`;
