import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";
import GlobalStyle from "../../components/GlobalStyle";
import ko from "date-fns/locale/ko"; // date-fns 라이브러리의 한국어 로케일
import DatePicker, { registerLocale } from "react-datepicker";
import { CommonButton } from "../../components/CommonButton";
import { useParams } from "react-router-dom";
import { ReqBranchName, ReqReservationState } from "../../apis/reservation";
import ModalBranchReserve from "./ModalBranchReserve";
import BackMove from "../../components/backMove";
import { usePageMoving } from "../../components/usePageMoving";

registerLocale("ko", ko);

const BranchReserve = () => {
  const { moveToReview } = usePageMoving();
  const bid = useParams("bid");
  const [clickBtn, setClickBtn] = useState(false);
  // branch이름 가져오기
  const [bname, setBname] = useState("");
  // 선택 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 선택 시간
  const [selectedTime, setSelectedTime] = useState();
  // parse한 날짜
  const [parseTime, setParseTime] = useState();
  // 오늘 날짜 가져오기
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2); // 연도
  const month = currentDate.getMonth() + 1; // 월
  const day = currentDate.getDate(); // 날짜

  // 예약되어 있는 정보
  const [reserveInfo, setReserveInfo] = useState([]);

  // 예약 시간 count
  const [reserveTime, setReserveTime] = useState({
    time1: 0,
    time2: 0,
    time3: 0,
    time4: 0,
    time5: 0,
    time6: 0,
    time7: 0,
    time8: 0,
    time9: 0,
    time10: 0,
    time11: 0,
    time12: 0,
  });

  // 사용자가 선택한 예약 정보
  const [userReservation, setUserReservation] = useState({
    reservationTime: "",
  });

  useEffect(() => {
    console.log(bid["*"]);
  }, [bid]);

  // 날짜 선택 시
  useEffect(() => {
    const selYear = selectedDate.getFullYear();
    const selMonth = (selectedDate.getMonth() + 1 < 10 ? "0" : "") + (selectedDate.getMonth() + 1);
    const selDay = (selectedDate.getDate() < 10 ? "0" : "") + selectedDate.getDate();
    setUserReservation({ reservationTime: `${selYear}-${selMonth}-${selDay} ${parseTime}` });

    async function getSelectDayReserveState() {
      try {
        console.log(`${selYear.toString().slice(-2)}-${selMonth}-${selDay}`);
        const rStateResponse = await ReqReservationState(
          bid["*"],
          `${selYear.toString().slice(-2)}-${selMonth}-${selDay}`,
        );
        setReserveInfo(rStateResponse.data);
        console.log("선택쓰날짜 : ", rStateResponse);
      } catch (err) {
        console.log(err);
      }
    }

    getSelectDayReserveState();
  }, [selectedDate, setSelectedDate]);

  const countReserveState = () => {
    reserveInfo.forEach((time) => {
      const hour = parseInt(time.reservationTime.slice(11, 13)); // 시간 부분을 숫자로 변환
      console.log(time.count);
      switch (hour) {
        case 11:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time1: time.count,
          }));
          break;
        case 12:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time2: time.count,
          }));
          break;
        case 13:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time3: time.count,
          }));
          break;
        case 14:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time4: time.count,
          }));
          break;
        case 15:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time5: time.count,
          }));
          break;
        case 16:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time6: time.count,
          }));
          break;
        case 17:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time7: time.count,
          }));
          break;
        case 18:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time8: time.count,
          }));
          break;
        case 19:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time9: time.count,
          }));
          break;
        case 20:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time10: time.count,
          }));
          break;
        case 21:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time11: time.count,
          }));
          break;
        case 22:
          setReserveTime((prevTime) => ({
            ...prevTime,
            time12: time.count,
          }));
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    countReserveState();
  }, [reserveInfo]);

  // 브랜치 이름 가져오기
  useEffect(() => {
    async function getBranchName() {
      try {
        const bnameResponse = await ReqBranchName(bid["*"]);
        setBname(bnameResponse.data);
      } catch (err) {
        console.log(err);
      }
    }

    getBranchName();
  }, []);

  // 시간 클릭 시 state 변화
  const handleTimeClick = (time) => {
    setParseTime(time);
    setSelectedTime(time.toString().slice(0, 2));
  };

  return (
    <>
      <GlobalStyle />
      <BackMove movePage={moveToReview} content={"리뷰 게시판"} />
      <Reservation>
        <h1>{bname} 예약</h1>
        <CalendarWrap>
          <DatePicker
            inline
            locale="ko"
            dateFormat="yyyy.MM.dd" // 날짜 형태
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={currentDate} // minDate 이전 날짜 선택 불가
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          ></DatePicker>
          <hr />
        </CalendarWrap>
        <SelectDateTime>
          <p>
            {selectedDate.getFullYear()}-
            {(selectedDate.getMonth() + 1 < 10 ? "0" : "") + (selectedDate.getMonth() + 1)}-
            {(selectedDate.getDate() < 10 ? "0" : "") + selectedDate.getDate()}
            {selectedTime && <span> {selectedTime}시</span>}
          </p>
        </SelectDateTime>

        <h2>시간 선택</h2>
        <TimeBox>
          <TimesCount>
            <Time
              count={reserveTime.time1}
              onClick={() => {
                handleTimeClick("11:00:00");
              }}
            >
              11시
            </Time>
            <p>{reserveTime.time1}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("12:00:00");
              }}
            >
              12시
            </Time>
            <p>{reserveTime.time2}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("13:00:00");
              }}
            >
              13시
            </Time>
            <p>{reserveTime.time3}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("14:00:00");
              }}
            >
              14시
            </Time>
            <p>{reserveTime.time4}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("15:00:00");
              }}
            >
              15시
            </Time>
            <p>{reserveTime.time5}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("16:00:00");
              }}
            >
              16시
            </Time>
            <p>{reserveTime.time6}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("17:00:00");
              }}
            >
              17시
            </Time>
            <p>{reserveTime.time7}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("18:00:00");
              }}
            >
              18시
            </Time>
            <p>{reserveTime.time8}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("19:00:00");
              }}
            >
              19시
            </Time>
            <p>{reserveTime.time9}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("20:00:00");
              }}
            >
              20시
            </Time>
            <p>{reserveTime.time10}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("21:00:00");
              }}
            >
              21시
            </Time>
            <p>{reserveTime.time11}/5</p>
          </TimesCount>
          <TimesCount>
            <Time
              onClick={() => {
                handleTimeClick("22:00:00");
              }}
            >
              22시
            </Time>
            <p>{reserveTime.time12}/5</p>
          </TimesCount>
        </TimeBox>
        <br />

        {selectedTime && (
          <CommonButton
            onClick={() => {
              setClickBtn(true);
            }}
          >
            예약
          </CommonButton>
        )}
        <br />
      </Reservation>
      {clickBtn && (
        <ModalBranchReserve
          userReservation={userReservation}
          bid={bid}
          branchname={bname}
          setClickBtn={setClickBtn}
        />
      )}
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

const TimesCount = styled.div`
  & > p {
    text-align: center;
  }
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

  background-color: ${(props) => (props.count === 5 ? "#ccc" : "")};
  pointer-events: ${(props) => (props.count === 5 ? "none" : "auto")};
`;

// 선택 예약 날짜
const SelectDateTime = styled.div`
  width: 80vw;
  text-align: center;
  background-color: aliceblue;
  padding: 3%;
  margin-bottom: 20px;

  & > p {
    font-size: 23px;
  }
`;

// 달력 div
const CalendarWrap = styled.div`
  position: relative;
  & > hr {
    margin-top: 2vh;
    margin-bottom: 2vh;
  }

  // 달력 전체 div
  .react-datepicker {
    width: 100%;
    font-size: 1.2em;
    font-family: "S-CoreDream-light";
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

  /* .react-datepicker__day:nth-child(1) {
    color: red;
  }

  .react-datepicker__day:nth-child(7) {
    color: #4848dd;
  } */
`;
