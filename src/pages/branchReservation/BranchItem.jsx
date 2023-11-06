import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import { usePageMoving } from "../../components/usePageMoving";

const BranchItem = () => {
  const { moveToBranchies } = usePageMoving();
  return (
    <>
      <BranchIntro>
        <p>XX점</p>
        <CommonButton
          onClick={() => {
            moveToBranchies();
          }}
        >
          상세보기 ▶
        </CommonButton>
      </BranchIntro>
    </>
  );
};
export default BranchItem;

const BranchIntro = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailButton = styled();
