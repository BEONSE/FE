import styled from "styled-components";
import BackMove from "../../../components/backMove";
import React from "react";
import { useEffect } from "react";
import { ReqMyReservation } from "../../../apis/reservation";
import { useState } from "react";
import ReservationItem from "./ReservationItem";

const MyReservation = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    async function getReservation() {
      try {
        const reserveResponse = await ReqMyReservation();
        console.log(reserveResponse);
        if (reserveResponse.status === 200) {
          setResList(reserveResponse.data.content);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getReservation();
  }, []);

  return (
    <>
      <BackMove />
      <Title>예약 현황</Title>
      {resList && resList.map((list) => <ReservationItem key={list.rvid} list={list} />)}
    </>
  );
};

export default MyReservation;

const Title = styled.h2`
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;
