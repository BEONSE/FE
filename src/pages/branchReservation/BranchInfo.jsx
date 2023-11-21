import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import { usePageMoving } from "../../components/usePageMoving";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import SingleMap from "../map/SingleMap";
import BackMove from "../../components/backMove";
import { ReqBranchInfo } from "../../apis/branch";

const BranchInfo = () => {
  const { moveToReservation } = usePageMoving();
  const param = useParams("bid");
  const [isBranchInfo, setIsBranchInfo] = useState({});

  useEffect(() => {
    console.log(param.bid);
    async function getBranch() {
      try {
        const branchResponse = await ReqBranchInfo(param.bid);
        console.log(branchResponse);
        if (branchResponse.status === 200) {
          setIsBranchInfo(branchResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getBranch();
  }, []);

  return (
    <>
      <BranchAllInfo>
        <BackMove />
        <KakaoMap id="siglemap">
          <SingleMap
            isLat={isBranchInfo.lat}
            isLng={isBranchInfo.lng}
            branchName={isBranchInfo.branchName}
          />
        </KakaoMap>
        <Address>
          <h1>BEONSE {isBranchInfo.branchName}</h1>
          <p>{isBranchInfo.address}</p>
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
          <p>{isBranchInfo.introduction}</p>
        </BranchIntro>
        <ReserveBtn
          onClick={() => {
            moveToReservation(param.bid);
          }}
        >
          예약하기
        </ReserveBtn>
        <BranchImage>
          <img src="" />
        </BranchImage>
      </BranchAllInfo>
    </>
  );
};

export default BranchInfo;

const BranchAllInfo = styled.div`
  width: 90vw;
  margin-left: 5vw;
`;

/* 지도 Style */
export const KakaoMap = styled.div`
  width: 100%;
  height: 30vh;
  margin-bottom: 2vh;
`;

/* 지점사 주소 Style */
const Address = styled.div`
  /* margin-left: 4vw; */
  margin-bottom: 3vh;
  text-align: left;
`;

/* 지점사 영업 시간 Style */
const OperationTime = styled.div`
  margin: auto;
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
  width: 100%;
  text-align: left;
`;
/* 지점사 소개 image Style */
const BranchImage = styled.div`
  width: 100%;
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

const ReserveBtn = styled(CommonButton)`
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
`;
