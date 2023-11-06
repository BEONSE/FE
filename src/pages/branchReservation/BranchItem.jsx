import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import { usePageMoving } from "../../components/usePageMoving";

const BranchItem = () => {
  const { moveToBranchies } = usePageMoving();
  return (
    <>
      <BranchIntro>
        <p>XX점</p>
        <DetailButton
          onClick={() => {
            moveToBranchies();
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

  padding: 20px;

  border: 1px solid black;
`;

const DetailButton = styled(CommonButton)`
  width: 20%;
`;
