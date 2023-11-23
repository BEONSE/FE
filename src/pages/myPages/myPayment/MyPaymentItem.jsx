import styled from "styled-components";

const MyPaymentItem = ({list}) => {

  return (
    <>
      <PaymentGroup>
        <p>{list.rnum}</p>
        <p>{list.paymentPrice}</p>
        <p>{list.points}</p>
        <Date>{list.paymentDate}</Date>
      </PaymentGroup>
    </>
  )
}

export default MyPaymentItem;

const PaymentGroup = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  margin: auto auto 1vh auto;
  text-align: center;
`

const Date = styled.p`
  width: 17vw;
`