import styled from "styled-components";

import BigLogoImg from "../../assets/big_logo.png";
import Person from "../../assets/person.png";
import Lock from "../../assets/lock.png";
import GlobalStyle from "../../components/GlobalStyle";

import { usePageMoving } from "../../components/usePageMoving";
import { CommonButton } from "../../components/CommonButton";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FormTag } from "../register/CommonRegister";
import { ReqLogin } from "../../apis/auth";
import { addAuthHeader } from "../../apis/axiosConfig";
import AppContext from "../../AppContext";
import BackMove from "../../components/backMove";

const Login = ({ setHideHeaderFooter }) => {
  const { moveToHome, moveToRegister } = usePageMoving();

  const appContext = useContext(AppContext);

  // 로그인 정보 state
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  //useRef
  const loginEmailRef = useRef();
  const loginPwdRef = useRef();

  // Header Footer 숨기기
  useEffect(() => {
    setHideHeaderFooter(true);
    return () => setHideHeaderFooter(false);
  }, [setHideHeaderFooter]);

  // 로그인 input 핸들러
  const loginInputHandler = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 로그인 버튼 클릭 핸들러
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await ReqLogin(loginUser);
      console.log(loginResponse);
      if (loginResponse.status === 200) {
        alert(loginResponse.data.successMessage);
        // 요청 공통 헤더에 추가
        addAuthHeader(loginResponse.headers.accesstoken); // data로 변경
        // Context에 인증 내용 저장
        appContext.setNickname(loginResponse.data.nickname);
        appContext.setAccessToken(loginResponse.headers.accesstoken);
        appContext.setRefreshToken(loginResponse.headers.refreshtoken);

        // Home 화면으로 이동
        moveToHome();
      }
    } catch (err) {
      console.log(err);
      const errResult = err.response.data;
      if (errResult.statusCode === 400) {
        // 이메일 불일치
        alert(errResult.errorMessage);
        loginEmailRef.current.focus();
      } else if (errResult.statusCode === 404) {
        // 비밀번호 불일치
        alert(errResult.errorMessage);
        loginPwdRef.current.focus();
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackMove />
      <LoginAllDiv onSubmit={handleLoginSubmit}>
        <img src={BigLogoImg} alt="BigLogoImage" onClick={() => moveToHome()} />
        <h1>로그인</h1>
        <FormTag>
          <LoginForm>
            <span>
              <img src={Person} alt="personImage" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="kimsecha@beonse.com"
              ref={loginEmailRef}
              onChange={loginInputHandler}
              required
            />
          </LoginForm>
          <LoginForm>
            <span>
              <img src={Lock} alt="KeyImage" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              ref={loginPwdRef}
              onChange={loginInputHandler}
              required
            />
          </LoginForm>
          <LoginButtonDiv>
            <LoginBtn type="submit">로그인</LoginBtn>
          </LoginButtonDiv>
        </FormTag>
        <AddService>
          <span onClick={() => {
          }}>아이디찾기 | </span>
          <span onClick={() => {
          }}>비밀번호찾기 | </span>
          <span
            onClick={() => {
              moveToRegister();
            }}
          >
            회원가입
          </span>
        </AddService>
      </LoginAllDiv>
    </>
  );
};

export default Login;

/* Styled Component */

// 로그인 입력 폼
export const LoginForm = styled.div`
  width: 80%;
  display: flex;
  margin-top: 2vh;
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
      margin-right: 5px;
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
// 아이디찾기|비밀번호찾기|회원가입
const AddService = styled.div`
  margin-top: 40px;
  & > span {
    cursor: pointer;
    font-family: "S-CoreDream-light";
    font-size: 13px;
  }
`;
