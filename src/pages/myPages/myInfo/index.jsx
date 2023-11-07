import styled from "styled-components";

import BigLogoImg from "../../../assets/big_logo.png";
import Person from "../../../assets/person.png";
import Key from "../../../assets/key.png";
import GlobalStyle from "../../../components/GlobalStyle";

import { usePageMoving } from "../../../components/usePageMoving";
import { CommonButton } from "../../../components/CommonButton";

const MyInfo = () => {
  const { moveToHome } = usePageMoving();

  return (
    <>
      <GlobalStyle />
      <LoginAllDiv>
        <img src={BigLogoImg} alt="BigLogoImage" onClick={() => moveToHome()} />
        <h1>회원정보수정</h1>
        <p>정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.</p>
        <p>비밀번호가 타인에게 노출되지 않도록 항상 주의해주세요.</p>
        <br />
        <LoginForm>
          <span>
            <img src={Person} alt="personImage" />
          </span>
          <input type="email" value="beonse@gmail.com" readOnly />
        </LoginForm>
        <LoginForm>
          <span>
            <img src={Key} alt="KeyImage" />
          </span>
          <input type="password" placeholder="*****" />
        </LoginForm>
        <LoginButtonDiv>
          <LoginBtn onClick={() => {}}>확인</LoginBtn>
        </LoginButtonDiv>
        <br />
      </LoginAllDiv>
    </>
  );
};

export default MyInfo;

/* Styled Component */

// 로그인 입력 폼
export const LoginForm = styled.div`
  width: 80%;
  display: flex;

  border: 1px solid #ececec;
  border-radius: 6px;

  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);
  & > input {
    border-radius: 6px;
    border: none;

    width: 100%;

    font-size: 15px;

    &:focus {
      outline: none;
    }
  }

  & > span {
    @media (min-width: 1171px) {
      padding: 15px;
    }
    @media (max-width: 1170px) {
      padding: 12px;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  &:focus-within {
    outline: auto;
    outline-color: #68d0f3;
  }

  @media (min-width: 1171px) {
    width: 30%;
  }
`;

// 로그인 전체 DIV
export const LoginAllDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
    @media (min-width: 1171px) {
      height: 14vh;
      margin-top: 6vh;
    }
    height: 14vh;
    margin-top: 4vh;
    cursor: pointer;
  }

  & > h1 {
    margin-top: 2.5vh;
    margin-bottom: 2vh;
  }

  & > ${LoginForm}:not(:first-child) {
    margin-top: 10px; // 첫 번째 LoginForm을 제외한 나머지에 적용
    @media (min-width: 1171px) {
      margin-top: 20px;
    }
  }
`;

// 로그인 버튼 div
export const LoginButtonDiv = styled.div`
  width: 80%;
  margin-top: 40px;

  @media (min-width: 1171px) {
    width: 30%;
  }
`;
// 로그인 버튼
export const LoginBtn = styled(CommonButton)`
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 15px;
`;
