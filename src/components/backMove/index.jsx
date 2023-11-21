import Back from "../../assets/back.png";
import styled from "styled-components";
import { useNavigate } from "react-router";

const BackMove = () => {
  const navigate = useNavigate();
  return (
    <>
      <ImageDiv
        onClick={() => {
          navigate(-1);
        }}
      >
        <Img src={Back} />
        &nbsp;뒤로가기
      </ImageDiv>
    </>
  );
};

export default BackMove;

const ImageDiv = styled.div`
  display: flex;
  margin: auto;
  width: 95%;
  height: 3vh;
  margin-top: 2vh;
`;

const Img = styled.img`
  height: 6vw;
`;
