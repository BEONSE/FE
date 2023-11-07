import { styled } from "styled-components";
import MateDetailItem from "./MateDetailItem";
import MateComment from "./MateComment";

const MateDetail = () => {
  return (
    <>
      <GroupDiv>
        <MateDetailItem />
        <MateComment />
      </GroupDiv>
    </>
  );
};

export default MateDetail;

const GroupDiv = styled.div``;
