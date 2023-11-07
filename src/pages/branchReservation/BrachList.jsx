import styled from "styled-components";
import BranchItem from "./BranchItem";

const BranchList = ({ setDetailClick }) => {
  return (
    <>
      <BranchLists>
        <BranchItem setDetailClick={setDetailClick} />
        <BranchItem setDetailClick={setDetailClick} />
        <BranchItem setDetailClick={setDetailClick} />
      </BranchLists>
    </>
  );
};

export default BranchList;

const BranchLists = styled.div`
  display: flex;
  flex-direction: column;
`;
