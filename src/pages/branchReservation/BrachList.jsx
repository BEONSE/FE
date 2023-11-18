import styled from "styled-components";
import BranchItem from "./BranchItem";

const BranchList = ({ isBranchInfo, showSearch, setShowSearch }) => {
  return (
    <>
      <BranchLists>
        {isBranchInfo.map((item) => (
          <BranchItem
            key={item.bid}
            isBranchInfo={item}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
        ))}
      </BranchLists>
    </>
  );
};

export default BranchList;

const BranchLists = styled.div`
  display: flex;
  flex-direction: column;
`;
