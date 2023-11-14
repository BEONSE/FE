import { LoginForm, LoginButtonDiv, LoginBtn } from "../login";
import { usePageMoving } from "../../components/usePageMoving";

import Person from "../../assets/person.png";
import LargeB from "../../assets/b.png";
import Address from "../../assets/address.png";
import Check from "../../assets/check.png";
import Key from "../../assets/key.png";
import Pencil from "../../assets/pencil.png";

import { useRef, useState } from "react";
import { ReqCommonRegister } from "../../apis/auth";
import styled from "styled-components";

const CommonRegister = () => {
  // 페이지 이동
  const { moveToLogin } = usePageMoving();
  // 비밀번호 확인
  const [pwdConfirm, setPwdConfirm] = useState(true);
  // 일반회원 가입 정보
  const [commonRegister, setCommonRegister] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
    address: "",
    role: "ROLE_USER",
  });

  // useRef
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nameRef = useRef(null);
  const nicknameRef = useRef(null);
  const addressRef = useRef(null);

  // const input 입력 감지 handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommonRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 비밀번호 이중 검사
  const passwordConfirm = (e) => {
    setPwdConfirm(commonRegister.password === e.target.value);
  };

  // 회원가입 폼 필드가 빈칸이 아닌지
  const isFormValid = () => {
    return (
      commonRegister.email &&
      commonRegister.password &&
      commonRegister.name &&
      commonRegister.nickname &&
      commonRegister.address &&
      pwdConfirm
    );
  };

  // 회원가입 빈칸 시 focus 주기
  const focusFirstEmptyField = () => {
    if (!commonRegister.email) {
      emailRef.current.focus();
      return;
    }
    if (!commonRegister.password) {
      passwordRef.current.focus();
      return;
    }
    if (!pwdConfirm) {
      passwordConfirmRef.current.focus();
      return;
    }
    if (!commonRegister.name) {
      nameRef.current.focus();
      return;
    }
    if (!commonRegister.nickname) {
      nicknameRef.current.focus();
      return;
    }
    if (!commonRegister.address) {
      addressRef.current.focus();
      return;
    }
  };

  // 회원가입 완료 버튼 클릭 시 서버에 데이터 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      focusFirstEmptyField();
      return;
    }
    try {
      const response = await ReqCommonRegister(commonRegister);
      if (response.status === 200) {
        alert("회원가입 완료 성공!!\n로그인 화면으로 이동합니다.");
        moveToLogin();
      }
    } catch (err) {
      const errResult = err.response.data;
      if (errResult.statusCode === 400) {
        // 이메일 중복
        alert(errResult.errorMessage);
        emailRef.current.focus();
      }
    }
  };

  return (
    <FormTag onSubmit={handleSubmit}>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input
          type="email"
          name="email"
          placeholder="kimsecha@beonse.com"
          ref={emailRef}
          onChange={handleInputChange}
          required
        />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Key} alt="PasswordImage" />
        </span>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          ref={passwordRef}
          onChange={handleInputChange}
          required
        />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Check} alt="PasswordImage" />
        </span>
        <input
          type="password"
          name="password-confirm"
          placeholder="비밀번호 확인"
          ref={passwordConfirmRef}
          onChange={passwordConfirm}
          required
        />
      </LoginForm>
      <Warning check={pwdConfirm}>{!pwdConfirm && <p>비밀번호가 일치하지 않습니다.</p>}</Warning>
      <LoginForm>
        <span>
          <img src={Pencil} alt="PasswordImage" />
        </span>
        <input
          type="text"
          name="name"
          placeholder="이름"
          ref={nameRef}
          onChange={handleInputChange}
          required
        />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={LargeB} alt="PasswordImage" />
        </span>
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          ref={nicknameRef}
          onChange={handleInputChange}
          required
        />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Address} alt="PasswordImage" />
        </span>
        <input
          type="text"
          name="address"
          placeholder="거주지"
          ref={addressRef}
          onChange={handleInputChange}
          required
        />
      </LoginForm>
      <Warning>{!isFormValid() && <p>모든 칸을 입력해주세요.</p>}</Warning>
      <LoginButtonDiv>
        <LoginBtn type="submit">회원가입 완료</LoginBtn>
      </LoginButtonDiv>
    </FormTag>
  );
};

export default CommonRegister;

const Warning = styled.div`
  color: red;
  margin-top: ${(props) => (props.check ? 0 : "2vh")};
`;

export const FormTag = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
