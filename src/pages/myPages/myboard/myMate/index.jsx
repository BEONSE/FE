import styled from "styled-components";
import MyMateItem from "./MyMateItem";

const MyMate = () => {
  return (
    <>
      <MyMateItem />
      <MyMateItem />
      <MyMateItem />
      <MyMateItem />
      <MyMateItem />
      <H4>더보기</H4>
    </>
  );
};

export default MyMate;

/* h4 Style */
const H4 = styled.h4`
  text-align: center;
  margin-bottom: 2vh;
`;
