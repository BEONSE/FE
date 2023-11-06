import { LoginForm, LoginButtonDiv, LoginBtn } from "../login";
import { usePageMoving } from "../../components/usePageMoving";

import Person from "../../assets/person.png";

const CommonRegister = () => {
  const { moveToLogin } = usePageMoving();
  return (
    <>
      {/* Form 태그로 감싸줘야될지도 */}
      <LoginForm>
        <span>
          <img src={Person} alt="IDImage" />
        </span>
        <input type="email" placeholder="아이디" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="PasswordImage" />
        </span>
        <input type="password" placeholder="비밀번호" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="PasswordImage" />
        </span>
        <input type="password" placeholder="비밀번호 확인" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="PasswordImage" />
        </span>
        <input type="text" placeholder="이름" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="PasswordImage" />
        </span>
        <input type="text" placeholder="닉네임" required />
      </LoginForm>
      <LoginForm>
        <span>
          <img src={Person} alt="PasswordImage" />
        </span>
        <input type="text" placeholder="거주지" required />
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

export default CommonRegister;
