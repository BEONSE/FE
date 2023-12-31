import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import { usePageMoving } from "../../components/usePageMoving";

const BranchItem = ({ isBranchInfo, showSearch, setShowSearch }) => {
  const { moveToBranchInfo } = usePageMoving();
  return (
    <>
      <BranchIntro>
        <p>BEONSE {isBranchInfo.name}</p>
        <DetailButton
          onClick={() => {
            moveToBranchInfo(isBranchInfo.bid);
          }}
        >
          상세보기 ▶
        </DetailButton>
      </BranchIntro>
    </>
  );
};
export default BranchItem;

const BranchIntro = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;

  margin-bottom: 4%;

  padding: 20px;

  border: 1px solid #c4c4c4;
  border-radius: 5px;

  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);
`;

const DetailButton = styled(CommonButton)`
  width: 30%;
`;
