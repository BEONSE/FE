import styled from "styled-components";
import { CommonButton } from "../../../components/CommonButton";
import { useEffect, useState } from "react";

const ReservationItem = ({ list }) => {
  // 문자열을 Date 객체로 변환
  const reservationTimeDate = new Date(list.reservationTime);

  // 연도, 월, 일 추출
  const year = reservationTimeDate.getFullYear();
  const month = reservationTimeDate.getMonth(); // getMonth()는 0부터 시작하므로 +1 해줍니다.
  const day = reservationTimeDate.getDate();

  // 목표 날짜 설정 (YYYY, MM - 1, DD)
  const targetDate = new Date(year, month, day); // 2023년 11월 25일을 목표 날짜로 설정

  // 현재 날짜 가져오기
  const currentDate = new Date();

  // 디데이 계산
  const diffInTime = targetDate.getTime() - currentDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)) + 1;

  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    setTimeOver(diffInDays <= 0);
    console.log(diffInDays);
  }, [diffInDays]);

  return (
    <>
      <ReserveAllDiv>
        <BranchName>
          <p>BEONSE {list.branchName}</p>
        </BranchName>
        <ResTime>
          <p>{list.reservationTime.toString().slice(0, -6)}시</p>
          <DDayBox finish={diffInDays <= 0}>
            {parseInt(diffInDays) === 0 ? (
              <h3>예약 당일</h3>
            ) : parseInt(diffInDays) >= 0 ? (
              <h3>{parseInt(diffInDays)}일 전</h3>
            ) : (
              <h3>예약 만료</h3>
            )}
          </DDayBox>
        </ResTime>
        <CancelButton over={timeOver}>{diffInDays >= 0 ? "예약 취소" : "취소 불가"}</CancelButton>
      </ReserveAllDiv>
    </>
  );
};

export default ReservationItem;

const ReserveAllDiv = styled.div`
  width: 90vw;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  margin: auto;
  border-radius: 20px;
  margin-bottom: 3vh;
  padding: 5%;
`;

const BranchName = styled.div`
  & > p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ResTime = styled.div`
  display: flex;
  justify-content: space-between;
  & > p {
    font-size: 20px;
  }
`;

const CancelButton = styled(CommonButton)`
  margin-top: 2vh;
  pointer-events: ${(props) => (props.over ? "none" : "auto")};
  background-color: ${({ over }) => (over ? "#ececec" : "")};
`;

const DDayBox = styled.div`
  & > h3 {
    font-size: 20px;
    color: ${(props) => (!props.finish ? "red" : "#cccccc")};
  }
`;
