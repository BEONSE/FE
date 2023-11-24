import { LoginForm, LoginButtonDiv, LoginBtn } from "../login";
import { usePageMoving } from "../../components/usePageMoving";

import Person from "../../assets/person.png";
import Address from "../../assets/address.png";
import Check from "../../assets/check.png";
import Key from "../../assets/key.png";
import Pencil from "../../assets/pencil.png";
import Ceo from "../../assets/ceo.png";
import Car from "../../assets/car.png";

import { FormTag } from "./CommonRegister";
import { useRef, useState, useEffect } from "react";
import { ReqBranchRegister, ReqCheckEmail } from "../../apis/auth";
import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";
import { CommonButton } from "../../components/CommonButton";

const BranchRegister = () => {
  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const response = await ReqCheckEmail(branchRegister.email);
      console.log(response.data);
      if (response.data.statusCode === 200) {
        alert("사용가능한 이메일입니다.");
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

  //다음 주소 모달
  const [popup, setPopup] = useState(false);

  const handleComplete = (data) => {
    setPopup(false);

    let fullAddress = data.address;

    console.log(data);
    let extraAddress = "";

    //도로명 주소
    if (data.addressType === "R") {
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setBranchRegister({
      ...branchRegister,
      address: fullAddress,
    });
  };

  const modalRef = useRef(null); //화면 외부 클릭하면 창이 닫히게

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (popup && modalRef.current && !modalRef.current.contains(event.target)) {
      setPopup(false);
    }
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
    try {
      const response = await ReqBranchRegister(branchRegister);
      if (response.status === 200) {
        alert("회원가입 완료 성공!!\n로그인 화면으로 이동합니다.");
        moveToLogin();
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
      <PostBtn onClick={handleCheckEmail}>중복 확인</PostBtn>
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
      <LoginForm>
        <span>
          <img src={Pencil} alt="IDImage" />
        </span>
        <input
          type="text"
          name="introduction"
          placeholder="가맹점 소개"
          onChange={handleInputChange}
        />
      </LoginForm>
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
  );
};

export default BranchRegister;

const Warning = styled.div`
  color: red;
  margin-top: ${(props) => (props.check ? 0 : "2vh")};
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
`;
