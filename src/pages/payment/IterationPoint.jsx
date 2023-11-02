import styled from "styled-components";

const IterationPoint = ({ price }) => {
  const Points = styled.div`
    background-color: #99e8f8;
    width: 60vw;
    height: 90px;
    margin: auto;
    border-radius: 10px;

    & > h2 {
      text-align: left;
      padding-top: 30px;
      margin-top: 30px;
      margin-left: 30px;
    }

    & > h2 > p {
      font-size: large;
      margin-left: 170px;
      display: inline;
    }
  `;
  const calcPrice = price * 11000;

  const formattedPrice = calcPrice.toLocaleString();

  return (
    <>
      <Points>
        <h2>
          {formattedPrice}p<p>{price}만원</p>
        </h2>
      </Points>
    </>
  );
};

export default IterationPoint;
