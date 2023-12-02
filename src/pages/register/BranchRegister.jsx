import { LoginBtn, LoginButtonDiv, LoginForm } from "../login";
import { usePageMoving } from "../../components/usePageMoving";

import Person from "../../assets/person.png";
import Address from "../../assets/address.png";
import Check from "../../assets/check.png";
import Key from "../../assets/key.png";
import Pencil from "../../assets/pencil.png";
import Ceo from "../../assets/ceo.png";
import Car from "../../assets/car.png";

import { FormTag } from "./CommonRegister";
import { useEffect, useRef, useState } from "react";
import { ReqBranchRegister, ReqCheckEmail } from "../../apis/auth";
import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";
import { CommonButton } from "../../components/CommonButton";
import WarningModal from "../../components/WarningModal";

const { kakao } = window;

const BranchRegister = () => {
  const [popupModal, setPopupModal] = useState(false);
  const [duplication, setDuplication] = useState(0);

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const response = await ReqCheckEmail(branchRegister.email);
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

  const handleComplete = (data) => {
    setPopup(false);

    console.log(data);

    let fullAddress = data.address;

    setBranchRegister({
      ...branchRegister,
      address: fullAddress,
    });
  };

  //페이지 이동
  const { moveToLogin } = usePageMoving();

  // 비밀번호 확인
  const [pwdConfirm, setPwdConfirm] = useState(true);

  // 가맹점 가입 정보
  const [branchRegister, setBranchRegister] = useState({
    email: "",
    password: "",
    branchName: "",
    name: "",
    introduction: "",
    address: "",
    lat: "",
    lng: "",
    role: "ROLE_BRANCH",
  });

  // useRef
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const branchNameRef = useRef(null);
  const nameRef = useRef(null);
  const addressRef = useRef(null);

  // const input 입력 감지 handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranchRegister((prevState) => ({
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
      case "branchName":
        validateBranchName();
        break;
      case "name":
        validateName();
        break;
      case "introduction":
        validateIntroduction();
        break;
      default:
        break;
    }
  };



  // 비밀번호 이중 검사
  const passwordConfirm = (e) => {
    setPwdConfirm(branchRegister.password === e.target.value);
  };

  // 회원가입 폼 필드가 빈칸이 아닌지
  const isFormValid = () => {
    return (
      branchRegister.email &&
      branchRegister.password &&
      branchRegister.branchName &&
      branchRegister.name &&
      branchRegister.address &&
      pwdConfirm
    );
  };

// 유효성 검사 상태
const [validationErrors, setValidationErrors] = useState({
  email: "",
  password: "",
  branchName: "",
  name: "",
  introduction: "",
});

const [emailValid, setEmailValid] = useState(false);
const [passwordValid, setPasswordValid] = useState(false);
const [nameValid, setNameValid] = useState(false);
const [branchnameValid, setBranchnameValid] = useState(false);
const [introductionValid, setIntroductionValid] = useState(false);
//소개란 글자 수
  const [introductionCount, setIntroductionCount] = useState(0);

//이메일 유효성 검사
  const validateEmail = () => {
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(branchRegister.email)
      && branchRegister.email.length >= 6
      && branchRegister.email.length < 30
      && branchRegister.email.includes("beonse_"));
    setValidationErrors((prevState) => ({
      ...prevState,
      email: emailValid ? "" : "beonse_ 포함한 유효한 이메일 주소를 입력하세요.",
    }));

    // 이메일 유효성 검사에 따라 중복 확인 버튼 활성화/비활성화 설정
    setDuplication(emailValid ? 0 : 1);
  }

  //비밀번호 유효성 검사
  const validatePassword = () => {
    setPasswordValid(/^[a-zA-z0-9]{4,12}$/.test(branchRegister.password)) ;
    setValidationErrors((prevState) => ({
      ...prevState,
      password: passwordValid ? "" : "영문자와 숫자를 포함하여 4~12자로 입력해주세요."
    }))
  }


  // 가맹점명 유효성 검사
  const validateBranchName = () => {
    setBranchnameValid(/^[가-힣A-Za-z0-9]{2,20}$/.test(branchRegister.branchName));
    setValidationErrors((prevState) => ({
      ...prevState, branchName: branchnameValid ? "" : "기호를 제외한 2자 ~ 20자로 입력해주세요." }));
  };

  // 이름 유효성 검사
  const validateName = () => {
    setNameValid( /^[가-힣]{2,10}$/.test(branchRegister.name));
    setValidationErrors((prevState) => ({
      ...prevState, name: nameValid ? "" : "한글로 2~ 10자로 입력해주세요." }));
  };

  // 소개란 유효성 검사
  const validateIntroduction = () => {
    setIntroductionValid( branchRegister.introduction.length <= 1000);
    setValidationErrors((prevState) => ({
      ...prevState, introduction: introductionValid ? "" : "1000자 이내로 입력해주세요." }));
  };

  // 소개란 글자수 세기 핸들러
  const handleIntroductionChange = (e) => {
    const { value } = e.target;
    if (value.length <= 1000) {
      setBranchRegister((prevState) => ({
        ...prevState,
        introduction: value,
      }));
      setIntroductionCount(value.length);
    }
  };
  //빈 칸에 focus 주기
  const focusFirstEmptyField = () => {
    if (!branchRegister.email) {
      emailRef.current.focus();
      return;
    }

    if (!branchRegister.password) {
      passwordRef.current.focus();
      return;
    }

    if (!pwdConfirm) {
      passwordConfirmRef.current.focus();
      return;
    }

    if (!branchRegister.branchName) {
      branchNameRef.current.focus();
      return;
    }

    if (!branchRegister.name) {
      nameRef.current.focus();
      return;
    }

    if (!branchRegister.address) {
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

      //개별 필드 유효성 검사
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

      if (!branchnameValid) {
        branchNameRef.current.focus();
        return;
      }

      if (!branchRegister.address) {
        addressRef.current.focus();
        return;
    }
    try {
      const response = await ReqBranchRegister(branchRegister);
      if (response.status === 200) {
        setPopupModal(true);
      }
    } catch (err) {
      const errResult = err.response.data;
      if (errResult.statusCode === 400) {
        // 닉네임(가맹점명) 중복
        alert(errResult.errorMessage);
        branchNameRef.current.focus();
      }
    }
  };

  useEffect(() => {
    // 주소 -> 좌표 가져오기

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(branchRegister.address.toString(), function(result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coordsY = result[0].y;
        var coordsX = result[0].x;
        console.log("위도", coordsY);
        console.log("경도", coordsX);
        setBranchRegister((prevItem) => ({
          ...prevItem,
          lat: coordsY,
          lng: coordsX,
        }));
      }
    });
  }, [branchRegister.address]);

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
            placeholder="beonse_000@gmail.com"
            ref={emailRef}
            onChange={handleInputChange}
            required
          />
        </LoginForm>
        <Warning check={!emailValid}>{validationErrors.email}</Warning>
        <Warning check={!duplication}>
          {duplication === 2 && <p>사용가능한 이메일입니다.</p>}
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
        <Warning check={!passwordValid}>{validationErrors.password}</Warning>
        <Warning check={pwdConfirm}>{!pwdConfirm && <p>비밀번호가 일치하지 않습니다.</p>}</Warning>
        <LoginForm>
          <span>
            <img src={Car} alt="branchImage" />
          </span>
          <input
            type="text"
            name="branchName"
            placeholder="가맹점명"
            ref={branchNameRef}
            onChange={handleInputChange}
            required
          />
        </LoginForm>
        <Warning check={!branchnameValid}>{validationErrors.branchName}</Warning>
        <LoginForm>
          <span>
            <img src={Ceo} alt="CeoImage" />
          </span>
          <input
            type="text"
            name="name"
            placeholder="대표자명"
            ref={nameRef}
            onChange={handleInputChange}
            required
          />
        </LoginForm>
        <Warning check={!nameValid}>{validationErrors.name}</Warning>
        <IntroductionForm>
          <span>
            <img src={Pencil} alt="IDImage" />
          </span>
          <textarea name="introduction" onChange={handleIntroductionChange} placeholder="가맹점 소개" value={branchRegister.introduction}></textarea>
        </IntroductionForm>
        <CharCount>{`(${introductionCount}/1000)`}</CharCount>
        <Warning check={!introductionValid}>{validationErrors.introduction}</Warning>
        <LoginForm>
          <span>
            <img src={Address} alt="AddressImage" />
          </span>
          <input
            type="text"
            name="address"
            placeholder="지점 주소"
            ref={addressRef}
            onChange={handleInputChange}
            value={branchRegister.address}
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
          content={"회원가입성공!"}
          content2={"승인처리까지 기다려주세요!"}
          movePage={moveToLogin}
        />
      )}
    </>
  );
};

export default BranchRegister;

const Warning = styled.div`
  color: red;
  margin-top: ${(props) => (props.check ? 0 : "2vh")};
  display: ${({ check }) => (check ? "red" : "none")};
`;

const PostModal = styled.div`
  background: rgba(0, 0, 0, 0.2);
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
  background-color:#36c036;
  color: white;
`;

export const IntroductionForm = styled.div`
  width: 80%;
  display: flex;
  margin-top: 2vh;
  border: 1px solid #ececec;
  border-radius: 6px;

  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.1);

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
    
  & > textarea {
    border-radius: 6px;
    border: none;
    resize: none;
    width: 100%;
    height: 20vh;

    font-size: 15px;
  }

`
export const CharCount = styled.div`
  margin-left: auto;
  margin-right: 10vw;
`;
