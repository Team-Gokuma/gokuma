import { Link } from "react-router-dom";
import { useState } from "react";
// import { useSetRecoilState } from "recoil";
// import { login } from "../api/user";

import styled from "styled-components";
import LoginInput from "../components/common/LoginInput";
import Button from "../components/common/Button";
import CommonTab from "../components/common/CommonTab"

const SignupPass = () => {
console.log()
  const handleChange = (e) => {
    const value = e.target.value;
    // setEmail(value);
  };


  return (
    <Stbody>
      <StWrapper>
      <CommonTab/>
        <StInput>
            <span>비밀번호를 입력해주세요.</span>
            <LoginInput type="password" name="password" placeholder="비밀번호" onChange={handleChange} value={password} />

            <LoginInput type="password" name="ckpassword" placeholder="비밀번호 확인" onChange={handleChange} value={ckpaasword} />
            <Link
              to={{
                pathname: "/SignupPass",
                // state: {
                //   email: email,
                // },
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

export default SignupPass;
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
