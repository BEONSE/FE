import { PulseLoader } from "react-spinners";
import styled from "styled-components";

const Loading = () => {
  return (
    <Load>
      <PulseLoader />
    </Load>
  );
};

export default Loading;

const Load = styled.div`
  margin-top: 1vh;
  margin-bottom: 1vh;
`;
