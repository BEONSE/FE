import styled from "styled-components";

import { usePageMoving } from "../../../components/usePageMoving";
import { CommonButton } from "../../../components/CommonButton";

import Person from "../../../assets/person.png";

const BranchUpdate = () => {
  const { moveToHome } = usePageMoving();

  return (
    <>
      <Title>가맹점 정보수정</Title>
      <br />
      <EditForm>
        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          <input type="email" placeholder="아이디" readOnly required />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Person} alt="PasswordImage" />
          </span>
          <input type="password" placeholder="비밀번호" required />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Person} alt="PasswordImage" />
          </span>
          <input type="password" placeholder="비밀번호 확인" required />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          <input type="text" placeholder="지점명" readOnly required />
          {/* 닉네임이 NOT NULL이라서 추후에 닉네임=지점명 처리 해줘야됌 */}
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          <input type="text" placeholder="대표자명" readOnly required />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          <input type="text" placeholder="지점 소개" />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          {/* 주소 API 연결하고, 여기만 태그 사이즈 변경하기 */}
          <input type="text" placeholder="지점 주소" />
        </LoginForm>
        <br />
        <LoginButtonDiv>
          {/* 입력 폼 다 안맞으면 버튼 안눌리게 만들기 */}
          <LoginBtn
            onClick={() => {
              moveToHome();
            }}
          >
            수정 완료
          </LoginBtn>
        </LoginButtonDiv>
        <br />
      </EditForm>
    </>
  );
};

export default BranchUpdate;

// 로그인 입력 폼
const EditForm = styled.div`
  display: grid;
  justify-items: center;
`;
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

const Title = styled.h2`
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
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
