import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";
import GlobalStyle from "../../components/GlobalStyle";
import ko from "date-fns/locale/ko"; // date-fns 라이브러리의 한국어 로케일
import DatePicker, { registerLocale } from "react-datepicker";
import { CommonButton } from "../../components/CommonButton";

registerLocale("ko", ko);

const BranchReserve = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <GlobalStyle />
      <Reservation>
        <h1>XX점 예약</h1>
        <CalendarWrap>
          <DatePicker
            inline
            locale="ko"
            dateFormat="yyyy.MM.dd" // 날짜 형태
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          ></DatePicker>
          <hr />
        </CalendarWrap>

        <h2>시간 선택</h2>
        <TimeBox>
          <Time>11시</Time>
          <Time>12시</Time>
          <Time>13시</Time>
          <Time>14시</Time>
          <Time>15시</Time>
          <Time>16시</Time>
          <Time>17시</Time>
          <Time>18시</Time>
          <Time>19시</Time>
          <Time>20시</Time>
          <Time>21시</Time>
          <Time>22시</Time>
        </TimeBox>
        <br />
        <SelectDateTime>
          <p>예약 선택 날짜</p>
          <p>
            2023년 11월 11일<spans> 12시</spans>
          </p>
        </SelectDateTime>
        <CommonButton>예약</CommonButton>
        <br />
      </Reservation>
    </>
  );
};

export default BranchReserve;

// 예약 전체 DIV
const Reservation = styled.div`
  @media (min-width: 501px) {
    width: 40vw;
  }
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > h1 {
    margin-top: 2vh;
    margin-bottom: 1.5vh;
  }
`;

// 시간 선택
const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
const Time = styled.p`
  border: 1px solid #bebebe;
  padding: 14px;
  text-align: center;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #99e8f8;
  }
`;

// 선택 예약 날짜
const SelectDateTime = styled.div`
  width: 100%;
  margin-bottom: 20px;
  & > p {
    font-size: 18px;
  }
`;

// 달력 div
const CalendarWrap = styled.div`
  & > hr {
    margin-top: 2vh;
    margin-bottom: 2vh;
  }
  // 달력 전체 div
  .react-datepicker {
    width: 100%;
    font-size: 1.2em;
    font-family: "S-CoreDream-light";
    z-index: 1;
  }

  // 달력 Header
  .react-datepicker__header {
    background-color: white;
  }

  // 월
  .react-datepicker__month-container {
    width: 100%;
    height: 100%;
    font-size: 22px;
  }
  .react-datepicker__current-month {
    font-size: 22px;
    margin-bottom: 9px;
  }

  // 요일
  .react-datepicker__day-names {
    display: flex;
    justify-content: center;
  }
  .react-datepicker__day-name {
    margin: 12px;
  }

  //날짜 클릭 시
  .react-datepicker__day--selected {
    background-color: #99e8f8;
    color: black;
    border-radius: 50%;
  }

  // 오늘 날짜
  .react-datepicker__day--today {
    color: #000;
    background-color: #ffee00;
    border-radius: 50%;
  }
  .react-datepicker__day--today.react-datepicker__day--selected {
    background-color: #99e8f8;
    color: black;
    border-radius: 50%;
  }

  // 이번달이 아닌 날짜
  .react-datepicker__day--outside-month {
    color: #bebebe;
  }
  .react-datepicker__day--outside-month.react-datepicker__day:nth-child(7) {
    color: #bebebe;
  }
  .react-datepicker__day--outside-month.react-datepicker__day:nth-child(1) {
    color: #bebebe;
  }

  // 하루
  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    margin-left: 7px;
    margin-right: 7px;
    width: 10%;
    height: 35px;
    padding: 5px;
  }

  // 한주
  .react-datepicker__week {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 22px;
  }

  /* day: 주말 날짜 */
  .react-datepicker__day:nth-child(1) {
    color: red;
  }
  .react-datepicker__day:nth-child(7) {
    color: #4848dd;
  }
`;
