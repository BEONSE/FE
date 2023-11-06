import styled from "styled-components";

const BranchBooked = () => {
  return (
    <>
      <Reservation>
        <p>예약 하기</p>
        <select name="time">
          <option value="">시간 선택</option>
          <option value="10:00">10시</option>
          <option value="11:00">11시</option>
          <option value="12:00">12시</option>
          <option value="13:00">13시</option>
          <option value="14:00">14시</option>
          <option value="15:00">15시</option>
          <option value="16:00">16시</option>
          <option value="17:00">17시</option>
          <option value="18:00">18시</option>
          <option value="19:00">19시</option>
          <option value="20:00">20시</option>
          <option value="21:00">21시</option>
          <option value="22:00">22시</option>
        </select>
        <button>예약</button>
      </Reservation>
    </>
  );
};

export default BranchBooked;

const Reservation = styled.div`
  display: flex;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-bottom: 4vh;
  justify-content: space-between;

  & > select {
  }

  & > button {
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 10px;
    background-color: #99e8f8;
  }
`;
