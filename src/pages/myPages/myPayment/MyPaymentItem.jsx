import styled from "styled-components";
import { useEffect } from "react";
import Point1 from "../../../assets/point1.png";
import Point2 from "../../../assets/point2.png";
import Point3 from "../../../assets/point3.png";

const MyPaymentItem = ({list}) => {

  return (
    <>

      <PaymentGroup>
        <PaymentNum>
           # {list.pid}
        </PaymentNum>

        <Points>
        {list.paymentPrice === 10000 && <img src={Point1} alt="pointimg" />}
        {list.paymentPrice === 30000 && <img src={Point2} alt="pointimg" />}
        {list.paymentPrice === 50000 && <img src={Point3} alt="pointimg" />}
        </Points>
        <PayInfo>
          
          <div> {list.cardName} ({list.cardNumber.toString().slice(-4)})</div>
          <div> {list.paymentDate}</div>
        </PayInfo>

      </PaymentGroup>
    </>
  )
}

export default MyPaymentItem;

const PaymentGroup = styled.div`
  width: 90vw;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  margin: auto;
  border-radius: 20px;
  margin-bottom: 3vh;
  padding: 5%;
`;

const PaymentNum = styled.div`
  margin-left: 2vw;
  margin-bottom: 2vh;
`;
const Points = styled.div`
  width: 100%;
  height: 14vh;
  margin: auto;
  margin-bottom: 10vh;

  display: flex;
  justify-content: space-around;
  align-items: center;

  & > img {
    width: 100%;
    margin-top: 10vh;
  }
`;

const PayInfo = styled.div`
  display: flex;
  text-align: right;
  justify-content: space-between;
  margin-left: 2vw;
  margin-right: 2vw;
`;


