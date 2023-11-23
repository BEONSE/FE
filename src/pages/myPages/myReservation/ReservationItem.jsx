import styled from "styled-components";
import { CommonButton } from "../../../components/CommonButton";

const ReservationItem = ({ list }) => {
  return (
    <>
      <ReseveAllDiv>
        <BranchName>
          <p>{list.branchName}</p>
        </BranchName>
        <ResTime>
          <p>{list.reservationTime}</p>
        </ResTime>
        <CancleBtn>예약 취소</CancleBtn>
      </ReseveAllDiv>
    </>
  );
};

export default ReservationItem;

const ReseveAllDiv = styled.div``;
const BranchName = styled.div``;
const ResTime = styled.div``;
const CancleBtn = styled(CommonButton)``;
