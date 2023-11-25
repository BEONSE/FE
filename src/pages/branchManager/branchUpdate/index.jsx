import styled from "styled-components";

import { CommonButton } from "../../../components/CommonButton";

import Person from "../../../assets/person.png";
import Address from "../../../assets/address.png";
import Check from "../../../assets/check.png";
import Key from "../../../assets/key.png";
import Pencil from "../../../assets/pencil.png";
import Ceo from "../../../assets/ceo.png";
import Car from "../../../assets/car.png";
import BackMove from "../../../components/backMove";
import { useEffect, useState } from "react";
import { ReqProfile } from "../../../apis/auth";
import GlobalStyle from "../../../components/GlobalStyle";
import ModalBranchUpdate from "./ModalBranchUpdate";
import { ReqBranchInfo } from "../../../apis/branch";
import { useParams } from "react-router-dom";

const BranchUpdate = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const editBtn = () => {
    setModalOpen(!modalOpen);
  };

  //비밀번호 확인
  const [pwdConfirm, setPwdConfirm] = useState(true);

  //비밀번호 이중 검사
  const passwordConfirm = (e) => {
    setPwdConfirm(branchUpdate.password === e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBranchUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [branchUpdate, setBranchUpdate] = useState({
    email: "",
    password: "",
    branchName: "",
    ceo: "",
    address: "",
    image: [],
    introduction: "",
    role: "ROLE_BRANCH",
  });

  const param = useParams("bid");
  // 내 프로필 요청하기
  useEffect(() => {
    async function getProfile() {
      try {
        const multipartFormData = new FormData();
        const profileResponse = await ReqBranchInfo(param.bid, multipartFormData);
        console.log(profileResponse);
        const response = await ReqProfile();
        console.log(response);
        if (profileResponse.status === 200) {
          setBranchUpdate(() => ({
            ...branchUpdate,
            email: response.data.email,
            password: "",
            branchName: profileResponse.data.branchName,
            ceo: response.data.name,
            address: profileResponse.data.address,
            image: profileResponse.data.imageDTOS.map((image) => image.imageData),
            introduction: profileResponse.data.introduction,
          }));
          console.log(branchUpdate);
          console.log(profileResponse.data.imageDTOS);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, []);

  const [imageFiles, setImageFiles] = useState([]);

  const onLoadImage = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      imageFiles[i] = files[i];
      console.log("fileUrls[i]", imageFiles[i]);
    }
    console.log("imageFiles", imageFiles);
  };

  const deleteImage = (index) => {
    const imageList = [...imageFiles];
    imageList.splice(index, 1);
    setImageFiles(imageList);
  };

  useEffect(() => {
    return () => {
      imageFiles?.forEach((item) => {
        URL.revokeObjectURL(item.preview_URL);
      });
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <BackMove />
      <Title>{branchUpdate.branchName} 정보 수정 페이지</Title>
      <br />
      <EditForm>
        <LoginForm>
          <span>
            <img src={Person} alt="IDImage" />
          </span>
          <input
            type="email"
            name="email"
            value={branchUpdate.email}
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
        <Warning check={pwdConfirm}>{!pwdConfirm && <p>비밀번호가 일치하지 않습니다.</p>}</Warning>
        <br />
        <LoginForm>
          <span>
            <img src={Car} alt="branchImage" />
          </span>
          <input
            type="text"
            name="branchName"
            defaultValue={branchUpdate.branchName}
            placeholder="지점명"
            disabled
          />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Ceo} alt="CeoImage" />
          </span>
          <input
            type="text"
            name="Ceo"
            defaultValue={branchUpdate.ceo}
            placeholder="대표자명"
            disabled
          />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Address} alt="AddressImage" />
          </span>
          <input
            type="text"
            name="address"
            value={branchUpdate.address}
            placeholder="지점 주소"
            disabled
          />
        </LoginForm>
        <br />
        <LoginForm>
          <span>
            <img src={Pencil} alt="PencilImage" />
          </span>
          <input
            type="text"
            name="introduction"
            defaultValue={branchUpdate.introduction}
            placeholder="지점 소개"
          />
        </LoginForm>
        <br />
        <input
          type="file"
          name="image"
          accept="image/*"
          value=""
          placeholder="지점 소개 사진"
          multiple={true}
          onChange={onLoadImage}
        />
        {branchUpdate.image.map((url, index) => (
          <>
            <ImageBox>
              <img src={`data:image/png;base64,${url}`} alt={`미리보기 ${index + 1}`} />
            </ImageBox>

            <DeleteBtn
              onClick={() => {
                deleteImage(index);
              }}
            >
              삭제
            </DeleteBtn>
          </>
        ))}

        <br />

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
        <br />
      </EditForm>
      {modalOpen && (
        <ModalBranchUpdate param={param} branchUpdate={branchUpdate} image={imageFiles} />
      )}
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

const Warning = styled.div`
  color: red;
  margin-top: ${(props) => (props.check ? 0 : "2vh")};
`;

const PostBtn = styled(CommonButton)`
  margin-top: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 80%;
  height: 80%;
`;

const PostModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 30%;
  height: 100%;
  width: 100%;
`;

const ImageBox = styled.div`
  width: 90vw;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;
const DeleteBtn = styled(CommonButton)`
  width: 20vw;
  margin-bottom: 0.5vh;
  margin-left: 70vw;
`;
