import { useEffect, useState } from "react";
import { ReqPoints } from "../../../apis/point";
import styled from "styled-components";

const MyPoints = () => {
  const [myPoint, setMyPoint] = useState();

  useEffect(() => {
    async function getPoint() {
      try {
        const pointResponse = await ReqPoints();
        console.log(pointResponse);
        if (pointResponse.status === 200) {
          setMyPoint(pointResponse.data.point.toLocaleString());
        }
      } catch (err) {
        console.log(err);
      }
    }
    getPoint();
  });

  return (
    <HavingPoint>
      <h2>보유 포인트</h2>
      <p>{myPoint}p</p>
    </HavingPoint>
  );
};

export default MyPoints;

const HavingPoint = styled.div`
  & > h2 {
    margin-bottom: 1vh;
  }

  & > p {
    font-size: 23px;
    text-align: right;
  }
`;
