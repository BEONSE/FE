import Back from "../../assets/back.png";
import styled from "styled-components";
import { useNavigate } from "react-router";

const BackMove = () => {

  const navigate = useNavigate();
  return (
    <>
      <ImageDiv>
        <Img src={Back} onClick={() => {navigate(-1)}}/>
      </ImageDiv>
    </>
  );
}

export default BackMove;

const ImageDiv = styled.div`
  width: 7vw;
  height: 4vh;
  margin-left: 4vw;
  margin-top: 2vh;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
`