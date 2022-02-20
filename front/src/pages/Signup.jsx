import { Link } from "react-router-dom";
import { useState } from "react";
// import { useSetRecoilState } from "recoil";
// import { login } from "../api/user";

import styled from "styled-components";
import LoginInput from "../components/common/LoginInput";
import Button from "../components/common/Button";
import CommonTab from "../components/common/CommonTab"


const Signup = () => {

  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  return (
    <Stbody>
      <StWrapper>
        <CommonTab></CommonTab>
        
        <StInput>
            <span>로그인에 사용할 이메일을 작성해주세요.</span>
            <LoginInput type="text" name="email" placeholder="이메일" onChange={handleChange} value={email} />
            <Link
              to={{
                pathname: "/SignupPass",
                state: {
                  email: email,
                },
              }}
            >
            <Button
              width="300px"
              height="60px"
              text="다음"
              bgcolor="orange"
              txtcolor="white"
              round="round"
            />
            </Link>
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
  & span{
      margin-top: 8.5rem;
  }
`;
