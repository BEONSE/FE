import { LoginForm, LoginButtonDiv, LoginBtn } from "../login";
import { usePageMoving } from "../../components/usePageMoving";

import Person from "../../assets/person.png";

const BranchRegister = () => {
  const { moveToLogin } = usePageMoving();
  return (
    <>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input type="text" placeholder="아이디" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input type="text" placeholder="비밀번호" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input type="text" placeholder="비밀번호 확인" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input type="text" placeholder="지점명" required />
        {/* 닉네임이 NOT NULL이라서 추후에 닉네임=지점명 처리 해줘야됌 */}
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input type="text" placeholder="대표자명" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input type="text" placeholder="지점 소개" />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        {/* 주소 API 연결하고, 여기만 태그 사이즈 변경하기 */}
        <input type="text" placeholder="지점 주소" />
      </LoginForm>
      <LoginButtonDiv>
        {/* 입력 폼 다 안맞으면 버튼 안눌리게 만들기 */}
        <LoginBtn
          onClick={() => {
            moveToLogin();
          }}
        >
          회원가입 완료
        </LoginBtn>
      </LoginButtonDiv>
    </>
  );
};

export default BranchRegister;
