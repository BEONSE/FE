import styled from "styled-components";

import BigLogoImg from "../../../assets/big_logo.png";
import Person from "../../../assets/person.png";
import Key from "../../../assets/key.png";
import GlobalStyle from "../../../components/GlobalStyle";

import { useNavigate } from "react-router";
import { usePageMoving } from "../../../components/usePageMoving";
import { CommonButton } from "../../../components/CommonButton";
import React, { useEffect, useState } from "react";
import { ReqProfile } from "../../../apis/auth";
import BackMove from "../../../components/backMove";

const MyInfo = () => {
  const { moveToHome } = usePageMoving();

  const navigate = useNavigate();

  const moveToUpdate = () => {
    navigate("/myinfo/update");
  };

  const [currentUser, setCurrentUser] = useState({
    email: "",
  });

  // 내 프로필 요청하기
  useEffect(() => {
    async function getProfile() {
      try {
        const profileResponse = await ReqProfile();
        if (profileResponse.status === 200) {
          setCurrentUser({
            ...currentUser,
            email: profileResponse.data.email,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, []);

  return (
    <>
      <GlobalStyle />
      <BackMove content={"홈으로"}/>
      <LoginAllDiv>
        <img src={BigLogoImg} alt="BigLogoImage" onClick={() => moveToHome()} />
        <h2>회원정보수정</h2>
        <br></br>
        <div>
          <p>정보를 안전하게 보호하기 위해 </p>
        </div>
        <p>
          <b>
            <u>비밀번호를 다시 한번 확인합니다.</u>
          </b>
        </p>
        <span>
          <p>비밀번호가 타인에게 노출되지 않도록</p>
        </span>
        <span>
          <p>항상 주의해주세요.</p>
        </span>
        <br />
        <EmailDiv>
          <span>
            <img src={Person} alt="personImage" />
          </span>
          <input type="text" value={currentUser.email} readOnly />
        </EmailDiv>
        <LoginForm>
          <span>
            <img src={Key} alt="KeyImage" />
          </span>
          <input type="password" placeholder="비밀번호 입력" />
        </LoginForm>
        <LoginButtonDiv>
          <LoginBtn onClick={moveToUpdate}>확인</LoginBtn>
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

  & > span > p {
    color: lightgray;
    font-size: 12px;
    margin-top: 4px;
  }

  & > div > p {
    color: black;
    font-size: 13px;
  }

  & > p > b > u {
    color: red;
    font-size: 15px;
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

const EmailDiv = styled(LoginForm)`
  &:focus-within {
    outline: none;
  }
`;
