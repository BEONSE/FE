import { ReserveAllDiv } from "../../myPages/myReservation/ReservationItem";
import styled from "styled-components";

const BranchReservationList = ({ list }) => {
  return (
    <>
      <ReserveAllDiv>
        <ReserveRvid> # {list.rvid}</ReserveRvid>
        <ReserveInfo>
          <ReserveTime>
            <div>{list.reservationTime.slice(0, -8)}</div> &emsp;
            <div>{list.reservationTime.slice(10, -6)}시</div>
          </ReserveTime>
          <div>&emsp;&emsp;{list.memberName}</div>
        </ReserveInfo>
      </ReserveAllDiv>
    </>
  );
};
export default BranchReservationList;

const ReserveRvid = styled.div`
  margin-left: 3vw;
  color: lightgray;
`;

const ReserveTime = styled.div`
  display: flex;
  margin-left: 3vw;
  font-size: 20px;
  background-color: antiquewhite;
  text-align: center;
`;

const ReserveInfo = styled.div`
  display: flex;
  font-size: 20px;
`;
