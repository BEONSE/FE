import styled from "styled-components";
import { CommonButton } from "../../../components/CommonButton";

import Sun from "../../../assets/sunnyborder.png";
import Person from "../../../assets/person.png";
import LargeB from "../../../assets/b.png";
import Address from "../../../assets/address.png";
import Check from "../../../assets/check.png";
import Key from "../../../assets/key.png";
import Pencil from "../../../assets/pencil.png";
import { useState, useEffect } from "react";
import { ReqProfile } from "../../../apis/auth";
import ModalMyInfoUpdate from "./ModalMyInfoUpdate";
// import { useRef } from "react";

const MyInfoUpdate = () => {
  //파일 미리볼 url을 저장해줄 state
  const [imageFile, setImageFile] = useState("");
  //이미지 파일 넣지 않았을 경우 default 이미지
  const defaultImage = Sun;

  //파일 저장
  const saveImageFile = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  // //파일 삭제
  // const deleteImageFile = () => {
  //   URL.revokeObjectURL(imageFile);
  //   setImageFile("");
  // };

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

  // useEffect(() => {
  //   console.log(commonUpdate.nickname);
  //   console.log(commonUpdate.password);
  //   console.log(commonUpdate.address);
  // }, []);

  // const input 입력 감지 handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCommonUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [modalOpen, setModalOpen] = useState(false);

  const editBtn = () => {
    setModalOpen(!modalOpen);
  };

  // const [updateUser, setUpdateUser] = useState({
  //   email: "",

  // });

  useEffect(() => {
    async function getProfile() {
      try {
        const multipartFormData = new FormData();
        const updateProfile = await ReqProfile(multipartFormData);
        console.log(updateProfile);
        if (updateProfile.status === 200) {
          setCommonUpdate((preData) => ({
            ...commonUpdate,
            email: updateProfile.data.email,
            password: updateProfile.data.password,
            name: updateProfile.data.name,
            nickname: updateProfile.data.nickname,
            address: updateProfile.data.address,
            image: updateProfile.data.image || preData.image,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
    getProfile();
  }, []);

  return (
    <>
      <Title>회원정보수정</Title>
      <EditForm>
        <input
          type="file"
          name="image"
          accept="image/*"
          value={commonUpdate.image}
          // value=""
          placeholder="프로필사진"
          // onChange={handleInputChange}
          onChange={saveImageFile}
        />

        {commonUpdate.image && (
          <img
            //    src={commonUpdate.image} // 이미지 URL을 설정
            src={imageFile ? saveImageFile : defaultImage}
            alt="미리보기"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}

        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          <input
            type="email"
            name="email"
            value={commonUpdate.email}
            placeholder="아이디"
            readOnly
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
            readOnly
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
          />
        </LoginForm>

        <LoginButtonDiv>
          {/* 입력 폼 다 안맞으면 버튼 안눌리게 만들기 */}
          <LoginBtn
            onClick={() => {
              editBtn();
            }}
          >
            수정 완료
          </LoginBtn>
        </LoginButtonDiv>
      </EditForm>
      {modalOpen && (
        <ModalMyInfoUpdate
          commonUpdate={commonUpdate}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      )}
    </>
  );
};

export default MyInfoUpdate;

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

/* 페이지 종류 Style */
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

const Warning = styled.div`
  color: red;
  margin-top: ${(props) => (props.check ? 0 : "2vh")};
`;
