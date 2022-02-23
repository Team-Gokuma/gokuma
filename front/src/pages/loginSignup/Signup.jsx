import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useSetRecoilState } from "recoil";
// import { login } from "../api/user";

import styled from "styled-components";
import LoginInput from "../../components/common/LoginInput";
import Button from "../../components/common/Button";
import CommonTab from "../../components/common/CommonTab";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  function isEmail(asValue) {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
  }
  const handleClick = (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      navigate("/SignupPass", { state: { email: email } });
    } else {
      alert("잘못된 이메일 형식입니다!");
      setEmail("");
    }
  };

  return (
    <Stbody>
      <StWrapper>
        <CommonTab></CommonTab>
        <StInput>
          <span>로그인에 사용할 이메일을 작성해주세요.</span>
          <form onSubmit={handleClick} style={{ textAlign: "center" }}>
            <LoginInput type="text" name="email" placeholder="이메일" onChange={handleChange} value={email} />
            <Button width="300px" height="60px" text="다음" bgcolor="orange" txtcolor="white" round="round" />
          </form>
        </StInput>
      </StWrapper>
    </Stbody>
  );
};

export default Signup;

const Stbody = styled.div`
  position: absolute;
  top: 6rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightgray};
  ${({ theme }) => theme.font.bold};
`;

const StWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: ${100 / 16}rem;
  width: ${600 / 16}rem;
  height: ${546 / 16}rem;
  box-shadow: 3px 7px 14px rgba(0, 0, 0, 0.05);
  border-radius: ${10 / 16}rem;
  background: ${({ theme }) => theme.color.white};
`;

const StInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin-bottom: 8.5rem;
  & span {
    margin-top: 8.5rem;
  }
`;