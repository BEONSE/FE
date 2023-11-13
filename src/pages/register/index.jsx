import styled from "styled-components";

import { useEffect, useState } from "react";
import { LoginAllDiv } from "../login";
import { usePageMoving } from "../../components/usePageMoving";

import GlobalStyle from "../../components/GlobalStyle";
import BigLogoImg from "../../assets/big_logo.png";
import CommonRegister from "./CommonRegister";
import BranchRegister from "./BranchRegister";

const Register = ({ setHideHeaderFooter }) => {
  // 화면 이동
  const { moveToHome } = usePageMoving();
  // 일반회원, 지점사 클릭 상태
  const [selectedType, setSelectedType] = useState(null);

  // Header Footer 숨기기
  useEffect(() => {
    setHideHeaderFooter(true);
    return () => setHideHeaderFooter(false);
  }, [setHideHeaderFooter]);

  useEffect(() => {
    if (selectedType === null) {
      setSelectedType("common");
    }
  }, [selectedType]);

  return (
    <>
      <GlobalStyle />
      <LoginAllDiv>
        <img src={BigLogoImg} alt="BigLogoImage" onClick={() => moveToHome()} />
        <h1>회원가입</h1>
        <MemberType>
          <TypeItem selected={selectedType === "common"} onClick={() => setSelectedType("common")}>
            <span>일반회원</span>
            <hr />
          </TypeItem>
          <TypeItem selected={selectedType === "branch"} onClick={() => setSelectedType("branch")}>
            <span>가맹점</span>
            <hr />
          </TypeItem>
        </MemberType>
        {selectedType === "common" ? <CommonRegister /> : <BranchRegister />}
      </LoginAllDiv>
    </>
  );
};

export default Register;

const MemberType = styled.div`
  @media (min-width: 1171px) {
    width: 30%;
  }
  display: flex;
  justify-content: center;

  margin-top: 2vh;
  margin-bottom: 2.5vh;
`;

const TypeItem = styled.div`
  cursor: pointer;

  width: 40vw;

  text-align: center;
  font-weight: ${({ selected }) => (selected ? "bold" : "null")};
  font-size: 20px;

  color: ${({ selected }) => (selected ? "black" : "#a5a4a4")}; // 선택되었을 때 색상 변경

  & > hr {
    border: 1px solid ${({ selected }) => (selected ? "black" : "#a5a4a4")};
  }
`;
