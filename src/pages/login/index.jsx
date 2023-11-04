import styled from "styled-components";

import BigLogoImg from "../../assets/big_logo.png";
import Person from "../../assets/person.png";
import Key from "../../assets/key.png";
import GlobalStyle from "../../components/GlobalStyle";

import { usePageMoving } from "../../components/usePageMoving";
import { ConmmonButton } from "../../components/CommonButton";
import { useEffect } from "react";

const Login = ({ setHideHeaderFooter }) => {
  const { moveToHome } = usePageMoving();

  // Header Footer 숨기기
  useEffect(() => {
    setHideHeaderFooter(true);
    return () => setHideHeaderFooter(false);
  }, [setHideHeaderFooter]);

  return (
    <>
      <GlobalStyle />
      <LoginAllDiv>
        <img src={BigLogoImg} alt="BigLogoImage" />
        <h1>로그인</h1>
        <LoginForm>
          <span>
            <img src={Person} alt="personImage" />
          </span>
          <input type="email" placeholder="kimsecha@beonse.com" />
        </LoginForm>
        <LoginForm>
          <span>
            <img src={Key} alt="KeyImage" />
          </span>
          <input type="password" placeholder="*****" />
        </LoginForm>
        <LoginButtonDiv>
          <LoginBtn
            onClick={() => {
              moveToHome();
            }}
          >
            로그인
          </LoginBtn>
        </LoginButtonDiv>
        <AddService>
          <span onClick={() => {}}>아이디찾기 | </span>
          <span onClick={() => {}}>비밀번호찾기 | </span>
          <span onClick={() => {}}>회원가입</span>
        </AddService>
      </LoginAllDiv>
    </>
  );
};

export default Login;

/* Styled Component */

// 로그인 입력 폼
const LoginForm = styled.div`
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
const LoginAllDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > img {
    @media (min-width: 1171px) {
      height: 18vh;
      margin-top: 6vh;
    }
    height: 14vh;
    margin-top: 4vh;
  }

  & > h1 {
    margin-top: 4vh;
    margin-bottom: 2vh;
  }

  & > ${LoginForm}:not(:first-child) {
    margin-top: 10px; // 첫 번째 LoginForm을 제외한 나머지에 적용
  }
`;

// 로그인 버튼 div
const LoginButtonDiv = styled.div`
  width: 80%;
  margin-top: 40px;

  @media (min-width: 1171px) {
    width: 30%;
  }
`;

const LoginBtn = styled(ConmmonButton)`
  padding-top: 15px;
  padding-bottom: 15px;

  font-size: 15px;
`;

const AddService = styled.div`
  margin-top: 40px;
  & > span {
    cursor: pointer;
    font-family: "S-CoreDream-light";
    font-size: 13px;
  }
`;
