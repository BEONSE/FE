import styled from "styled-components";
import BackMove from "../../../components/backMove";
import React from "react";

const MyReservation = () => {
  return (
    <>
      <BackMove />
      <Title>예약 현황</Title>
    
    </>
  );
};

export default MyReservation;

const Title = styled.h2`
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;