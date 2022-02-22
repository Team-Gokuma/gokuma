import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api/user";

import { loginState } from "../store/atom";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";
import LoginInput from "../components/common/LoginInput";
import Button from "../components/common/Button";
import CommonTab from "../components/common/CommonTab"


const SignupNick = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const setIsLogin = useSetRecoilState(loginState);
  const handleChange = (e) => {
    const value = e.target.value;
    setNickname(value);
  };
  const email = location.state.email;
  const password =location.state.pass.password;
  

  const requestSignup = async body => {
    await signup(body).then(res => {
      if (res.status === 200) {
        setIsLogin(true);
        navigate("/login");
      } else {
        alert(res.msg);
      }
    });
  };

  const handleClick = (e) =>{
    e.preventDefault();
    const body = {email:email, password:password, nickname:nickname };
    console.log(body);
    requestSignup(body);
  };

  return (
    <Stbody>
      <StWrapper>
        <CommonTab></CommonTab>
        <StInput>
            <span>닉네임을 입력해주세요.</span>
            <form onSubmit={handleClick} style={{ textAlign: "center" }}>
            <LoginInput type="text" name="nickname" placeholder="닉네임" onChange={handleChange} value={nickname} />
            <Button
              width="300px"
              height="60px"
              text="가입하기"
              bgcolor="orange"
              txtcolor="white"
              round="round"
            />
            </form>
        </StInput>
      </StWrapper>
    </Stbody>
  );
};

export default SignupNick;

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
  margin-bottom: 10rem;
  & span{
      margin-top: 8.5rem;
  }
`;
