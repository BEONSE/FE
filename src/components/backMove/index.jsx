import Back from "../../assets/back.png";
import styled from "styled-components";
import { usePageMoving } from "../usePageMoving";
import { useNavigate } from "react-router-dom";

const BackMove = ({ movePage, content }) => {
  const { moveToHome } = usePageMoving();
  const navigate = useNavigate();
  const move = () => {
    if (typeof movePage === "function") {
      movePage();
    } else {
      moveToHome();
    }
  };

  return (
    <>
      <ImageDiv
        onClick={() => {
          move();
        }}
      >
        <Img src={Back} />
        &nbsp;{content}
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
  align-items: center;
  font-size: 20px;
`;

const Img = styled.img`
  height: 5vw;
`;
