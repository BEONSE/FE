import styled from "styled-components";
import { CommonButton } from "../../../components/CommonButton";
import DaumPostcode from "react-daum-postcode";

import Basic from "../../../assets/profile.jpg";
import Person from "../../../assets/person.png";
import LargeB from "../../../assets/b.png";
import Address from "../../../assets/address.png";
import Check from "../../../assets/check.png";
import Key from "../../../assets/key.png";
import Pencil from "../../../assets/pencil.png";
import { useEffect, useState } from "react";
import { ReqProfile } from "../../../apis/auth";
import ModalMyInfoUpdate from "./ModalMyInfoUpdate";

import BackMove from "../../../components/backMove";
import { Warning } from "../../register/CommonRegister";
// import { useRef } from "react";

const MyInfoUpdate = () => {
  const [isModified, setIsModified] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [hasError, setHasError] = useState(false);
   //다음 주소 모달
  const [popup, setPopup] = useState(false);
  const handleComplete = (data) => {
    setPopup(false);

    let fullAddress = data.address;
    
    setCommonUpdate({
      ...commonUpdate,
      image: "",
      address: fullAddress,
    });
  };

  // 이미지 정보
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 비밀번호 확인
  const [pwdConfirm, setPwdConfirm] = useState(true);

  // 비밀번호 이중 검사
  const passwordConfirm = (e) => {
    setPwdConfirm(commonUpdate.password === e.target.value);
  };

  const [commonUpdate, setCommonUpdate] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
    address: "",
    image: "",
    role: "ROLE_USER",
  });

  // Image Handler 함수
  const onLoadImage = (e) => {
    const file = e.target.files;
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file[0]);
  };

  // const input 입력 감지 handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCommonUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setIsModified(true);
    // 입력 필드에 기반한 동적 유효성 검사
    switch (name) {
      case "password":
        validatePassword();
        break;
      case "nickname":
        validateNickname();
        break;
      default:
        break;
    }
  };

  // 유효성 검사 상태
  const [validationErrors, setValidationErrors] = useState({
    password: "",
    nickname: "",
  });

  const [passwordValid, setPasswordValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

  //비밀번호 유효성 검사 : 4~12자리
  const validatePassword = () => {
    setPasswordValid(/^[a-zA-z0-9]{4,12}$/.test(commonUpdate.password)) ;
    setValidationErrors((prevState) => ({
      ...prevState,
      password: passwordValid ? "" : "영문자와 숫자를 포함하여 4~12자로 입력해주세요."
    }))
  }

  // 닉네임 유효성 검사
  const validateNickname = () => {
    setNicknameValid(/^[가-힣A-Za-z0-9]{2,20}$/.test(commonUpdate.nickname));
    setValidationErrors((prevState) => ({
      ...prevState, nickname: nicknameValid ? "" : "기호를 제외한 2자 ~ 20자로 입력해주세요." }));
  };

  // 회원정보 수정 폼 필드가 빈칸이 아닌지 및 유효성 검사
  const isFormValid = () => {
    return (
      commonUpdate.password &&
      commonUpdate.nickname &&
      passwordValid &&
      pwdConfirm &&
      nicknameValid
    );
  };

  const [modalOpen, setModalOpen] = useState(false);

  const editBtn = () => {
    if (isModified && isFormValid()) {
      setModalOpen(!modalOpen);
    } else if (!isModified) {
      setWarningMessage("변경된 정보가 없습니다.");
      setHasError(true);
    } else {
      setWarningMessage("양식에 맞게 입력해주세요.");
      setHasError(true);
    }
  };

  useEffect(() => {
    async function getProfile() {
      try {
        const multipartFormData = new FormData();
        const updateProfile = await ReqProfile(multipartFormData);
        console.log("res", updateProfile);
        if (updateProfile.status === 200) {
          setCommonUpdate((preData) => ({
            ...commonUpdate,
            email: updateProfile.data.email,
            password: "",
            name: updateProfile.data.name,
            nickname: updateProfile.data.nickname,
            address: updateProfile.data.address,
            image: updateProfile.data.imageData || preData.image,
          }));
          console.log("profile update", commonUpdate);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, []);

  return (
    <>
      <TopMenu>
        <BackMove content={"홈으로"}/>
        <p
          onClick={() => {
            // 탈퇴 API 연결
          }}
        >
          회원탈퇴
        </p>
      </TopMenu>
      <Title>회원정보수정</Title>
      <EditForm>
        <ProfileImg>
          {imageUrl ? (
            <img src={imageUrl} alt="Preview" />
          ) : commonUpdate.image ? (
            <img src={`data:image/png;base64,${commonUpdate.image}`} alt="profile" />
          ) : (
            <img src={Basic} alt="profile" />
          )}
          <input id="input-file" type="file" accept="image/jpg, image/jpeg, image/png" onChange={onLoadImage} style={{ display: "none" }}/>
          <label className="input-file-button" for="input-file">사진 선택</label>
        </ProfileImg>
        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          <input
            type="email"
            name="email"
            value={commonUpdate.email}
            placeholder="아이디"
            disabled
          />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Key} alt="PasswordImage" />
          </span>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleInputChange}
          />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Check} alt="PasswordImage" />
          </span>
          <input
            type="password"
            name="password-confirm"
            placeholder="비밀번호 확인"
            onChange={passwordConfirm}
          />
        </LoginForm>
        <Warning check={!passwordValid}>{validationErrors.password}</Warning>
        <Warning check={pwdConfirm}>{!pwdConfirm && <p>비밀번호가 일치하지 않습니다.</p>}</Warning>
        <br />
        <LoginForm>
          <span>
            <img src={Pencil} alt="PasswordImage" />
          </span>
          <input
            type="text"
            name="name"
            defaultValue={commonUpdate.name}
            placeholder="이름"
            disabled
          />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={LargeB} alt="PasswordImage" />
          </span>
          <input
            type="text"
            name="nickname"
            defaultValue={commonUpdate.nickname}
            placeholder="닉네임"
            onChange={handleInputChange}
          />
        </LoginForm>
        <br />
        <Warning check={!nicknameValid}>{validationErrors.nickname}</Warning>
        <LoginForm>
          <span>
            <img src={Address} alt="PasswordImage" />
          </span>
          <input
            type="text"
            name="address"
            defaultValue={commonUpdate.address}
            placeholder="거주지"
            onChange={handleInputChange}
            readOnly
          />
        </LoginForm>
        <PostBtn onClick={() => setPopup(true)}>우편번호 찾기</PostBtn>
        {popup && (
          <PostModal>
            <DaumPostcode autoClose onComplete={handleComplete} />
          </PostModal>
        )}
        <LoginButtonDiv>
          <LoginBtn
            onClick={() => {
              editBtn();
            }}
          >
            수정 완료
          </LoginBtn>
          {hasError &&<CustomWarning hasError={true}>{warningMessage}</CustomWarning>}
        </LoginButtonDiv>
      </EditForm>
      {modalOpen && (
        <ModalMyInfoUpdate
          commonUpdate={commonUpdate}
          image={image}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      )}
    </>
  );
};
export default MyInfoUpdate;

export const CustomWarning = styled.p`
  color: red;
  text-align: center;
  margin-top: ${(props) => (props.hasError ? 0 : "2vh")};
  display: ${({ hasError }) => (hasError ? "red" : "none")};
`;

// 로그인 입력 폼
const EditForm = styled.div`
  display: grid;
  justify-items: center;
  margin-bottom: 3rem;
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

// 뒤로가기 회원 탈퇴
const TopMenu = styled.div`
  margin: auto;
  width: 90vw;
  display: flex;
  align-items: flex-end;

  & > p {
    color: #969696;
    width: 20vw;
    cursor: pointer;
  }
`;

const ProfileImg = styled.div`
  width: 32vw;
  margin-bottom: 2vh;

  & > img {
    margin-bottom: 2vh;
    width: 32vw;
    height: 40vw;
    border-radius: 50%;
    object-fit: cover;
  }

  & > label {
    margin-left: 2vw;
    padding: 6px 25px;
    background-color:#36c036;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
`;

/* 페이지 종류 Style */
const Title = styled.h2`
  text-align: center;
  margin-top: 2vh;
  margin-bottom: 2vh;
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

const PostModal = styled.div`
  background: rgba(0, 0.0, 0, 0.25);
  position: fixed;
  left: 0;
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
