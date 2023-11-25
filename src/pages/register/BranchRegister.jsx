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
    geocoder.addressSearch(branchRegister.address.toString(), function (result, status) {
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
        <Warning check={!duplication}>
          {duplication === 2 && <p>사용가능한 이메일입니다.</p>}
          {duplication === 3 && <p>사용할 수 없는 이메일입니다.</p>}
        </Warning>
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
