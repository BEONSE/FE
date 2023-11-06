import styled from "styled-components";

const BranchInfo = () => {
  return (
    <>
      <Map>지도</Map>
      <Address>
        <h1>BEONSE XX점</h1>
        <p>서울특별시 금천구 가산동 2xx-x</p>
      </Address>
      <OperationTime>
        <div>
          <h3>효용 대수</h3>
          <h3>영업시간</h3>
        </div>
        <div>
          <p>10대</p>
          <p>24시간 영업</p>
        </div>
      </OperationTime>
      <BranchIntro>
        <p>지점사 소개구간 입니다만...</p>
      </BranchIntro>
      <BranchImage>
        <img src="" />
      </BranchImage>
    </>
  );
};

export default BranchInfo;

/* 지도 Style */
const Map = styled.div`
  width: 90vw;
  height: 30vh;
  background-color: gray;
  color: white;
  margin-top: 3vh;
  margin-left: 5vw;
  margin-bottom: 3vh;
  padding-top: 13vh;
  text-align: center;
  font-size: 30px;
`;

/* 지점사 주소 Style */
const Address = styled.div`
  margin-left: 4vw;
  margin-bottom: 3vh;
`;

/* 지점사 영업 시간 Style */
const OperationTime = styled.div`
  margin-right: 4vw;
  margin-left: 4vw;

  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1vh;
  }

  & > div > p {
    margin-bottom: 3vh;
  }
`;
/* 지점사 소개 문구 Style */
const BranchIntro = styled.div`
  margin-left: 4vh;
`;
/* 지점사 소개 image Style */
const BranchImage = styled.div`
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;

  & > img {
    width: 80%;
    height: 80%;
    margin-top: 50px;
    padding-top: 10%;
    padding-left: 10%;
    border-color: green;
    border-style: double;
    background-color: white;
  }
`;
