import { LoginBtn, LoginButtonDiv, LoginForm } from "../login";
import { usePageMoving } from "../../components/usePageMoving";

import Person from "../../assets/person.png";
import LargeB from "../../assets/b.png";
import Address from "../../assets/address.png";
import Check from "../../assets/check.png";
import Key from "../../assets/key.png";
import Pencil from "../../assets/pencil.png";

import { useRef, useState } from "react";
import { ReqCheckEmail, ReqCommonRegister } from "../../apis/auth";
import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";
import { CommonButton } from "../../components/CommonButton";
import WarningModal from "../../components/WarningModal";

const CommonRegister = () => {
  // 페이지 이동
  const { moveToLogin } = usePageMoving();
  const [popupModal, setPopupModal] = useState(false);
  const [duplication, setDuplication] = useState(0);

  // 비밀번호 확인
  const [pwdConfirm, setPwdConfirm] = useState(true);

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const response = await ReqCheckEmail(commonRegister.email);
      console.log(response.data);
      if (response.data.statusCode === 200) {
        setDuplication(2);
      }
    } catch (err) {
      const errResult = err.response.data;
      if (errResult.statusCode === 400) {
        // 이메일 중복
        setDuplication(3);
        emailRef.current.focus();
      }
    }
  };

  //다음 주소 모달
  const [popup, setPopup] = useState(false);

  //다음 주소 받아오기
  const handleComplete = (data) => {
    setPopup(false);

    let fullAddress = data.address;
  //   let extraAddress = "";
  //
  //   //도로명 주소
  //   if (data.addressType === "R") {
  //     // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
  //     if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== "" && data.apartment === "Y") {
  //       extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //
  //     fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  //   }

    setCommonRegister({
      ...commonRegister,
      address: fullAddress,
    });
  };

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

    // 입력 필드에 기반한 동적 유효성 검사
    switch (name) {
      case "email":
        validateEmail();
        break;
      case "password":
        validatePassword();
        break;
      case "nickname":
        validateNickname();
        break;
      case "name":
        validateName();
        break;
         default:
        break;
    }
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

  // 유효성 검사 상태
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    nickname: "",
    name: "",
  });

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);


  //이메일 유효성 검사
  const validateEmail = () => {
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commonRegister.email) && commonRegister.email.length >= 6 && commonRegister.email.length < 30);
    setValidationErrors((prevState) => ({
      ...prevState,
      email: emailValid ? "" : "유효한 이메일 주소를 입력하세요."
    }));

    // 이메일 유효성 검사에 따라 중복 확인 버튼 활성화/비활성화 설정
    setDuplication(emailValid ? 0 : 1);
  };

  //비밀번호 유효성 검사 : 4~12자리
  const validatePassword = () => {
    setPasswordValid(/^[a-zA-z0-9]{4,12}$/.test(commonRegister.password)) ;
    setValidationErrors((prevState) => ({
      ...prevState,
      password: passwordValid ? "" : "영문자와 숫자를 포함하여 4~12자로 입력해주세요."
    }))
  }

  // 닉네임 유효성 검사
  const validateNickname = () => {
    setNicknameValid(/^[가-힣A-Za-z0-9]{2,20}$/.test(commonRegister.nickname));
    setValidationErrors((prevState) => ({
      ...prevState, nickname: nicknameValid ? "" : "기호를 제외한 2자 ~ 20자로 입력해주세요." }));
  };

  // 이름 유효성 검사
  const validateName = () => {
    setNameValid( /^[가-힣]{2,10}$/.test(commonRegister.name));
    setValidationErrors((prevState) => ({
      ...prevState, name: nameValid ? "" : "한글로 2~ 10자로 입력해주세요." }));
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

    // 개별 필드 유효성 검사
    if (!emailValid) {
      emailRef.current.focus();
      return;
    }

    if (!passwordValid) {
      passwordRef.current.focus();
      return;
    }

    if (!pwdConfirm) {
      passwordConfirmRef.current.focus();
      return;
    }

    if (!nameValid) {
      nameRef.current.focus();
      return;
    }

    if (!nicknameValid) {
      nicknameRef.current.focus();
      return;
    }

    if (!commonRegister.address) {
      addressRef.current.focus();
      return;
    }

    try {
      const response = await ReqCommonRegister(commonRegister);
      if (response.status === 200) {
        setPopupModal(true);
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
    <>
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
        <Warning check={!emailValid}>{validationErrors.email}</Warning>
        <Warning check={!duplication}>
          {duplication === 2 && <p>사용 가능한 이메일입니다.</p>}
          {duplication === 3 && <p>사용할 수 없는 이메일입니다.</p>}
        </Warning>

        <PostBtn onClick={handleCheckEmail} disabled={duplication !== 0}>중복 확인</PostBtn>
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
        <Warning check={!passwordValid}>{validationErrors.password}</Warning>
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
        <Warning check={!nameValid}>{validationErrors.name}</Warning>
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
        <Warning check={!nicknameValid}>{validationErrors.nickname}</Warning>

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
            value={commonRegister.address}
            required
            readOnly
          />
        </LoginForm>
        <PostBtn onClick={() => setPopup(true)}>우편번호 찾기</PostBtn>
        {popup && (
          <PostModal>
            <DaumPostcode autoClose onComplete={handleComplete} />
          </PostModal>
        )}
        <Warning>{!isFormValid() && <p>모든 칸을 입력해주세요.</p>}</Warning>
        <LoginButtonDiv>
          <LoginBtn type="submit">회원가입 완료</LoginBtn>
        </LoginButtonDiv>
      </FormTag>
      {popupModal && (
        <WarningModal
          content={"회원가입성공!!"}
          content2={"로그인 페이지로 이동합니다."}
          movePage={moveToLogin}
        />
      )}
    </>
  );
};

export default CommonRegister;

export const Warning = styled.div`
  color: red;
  margin-top: ${(props) => (props.check ? 0 : "2vh")};
  display: ${({ check }) => (check ? "red" : "none")};
`;

export const FormTag = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 30%;
  height: 100%;
  width: 100%;
`;

const PostBtn = styled(CommonButton)`
  margin-top: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 80%;
  height: 80%;
`;
