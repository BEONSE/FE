import Back from "../../assets/back.png";
import styled from "styled-components";
import { usePageMoving } from "../usePageMoving";

const BackMove = ({ movePage }) => {
  const { moveToHome } = usePageMoving();

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
