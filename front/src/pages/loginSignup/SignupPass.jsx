import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styled from "styled-components";
import Button from "../../components/common/Button";
import CommonTab from "../../components/common/CommonTab";
import { ReactComponent as Ckeckicon } from "../../asset/icon/check.svg";

const SignupPass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const [pass, setPass] = useState({
    password: "",
    ckpassword:""
  });
  const [ckNum, setCkNum] = useState(false);
  const [ckEng, setCkEng] = useState(false);
  const [ckSpc, setCkSpc] = useState(false);
  const [ckLen, setCkLen] = useState(false);
  const [ckCorrect, setCkCorrect] = useState(false);

  const { password, ckpassword } = pass;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setPass({
      ...pass,
      [name]: value,
    });
  };
  // 영어, 숫자, 특수문자, 8자리이상
  useEffect(() => {
    PassValid(password);
  }, [pass]);
  function PassValid(password) {
    let checkNum = /[0-9]/;
    let checkEng = /[a-zA-Z]/;
    let checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;

    setCkEng(checkEng.test(password) ? true : false);
    setCkNum(checkNum.test(password) ? true : false);
    setCkSpc(checkSpc.test(password) ? true : false);
    setCkLen(password.length >= 8 ? true : false);
    setCkCorrect(password.length !== 0 && password === ckpassword ? true : false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ckpassword && ckEng && ckSpc && ckLen && ckNum && ckCorrect) {
      navigate("/SignupNick", { state: { email: email, pass: pass } });
    } else {
      alert("비밀번호를 다시 확인해주세요!");
    }
  };

  return (
    <Stbody>
      <StWrapper>
        <CommonTab />
        <StInput>
          <span style={{ fontWeight: "bold" }}>비밀번호를 입력해주세요.</span>
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <SignInput
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={handleChange}
              value={password}
            />
            <StCheck>
              <div style={ckEng ? { fill: "#4FAAFF", color: "#4FAAFF" } : { fill: "black", color: "black" }}>
                <span>영어 포함</span>
                <Ckeckicon />
              </div>

              <div style={ckNum ? { fill: "#4FAAFF", color: "#4FAAFF" } : { fill: "black", color: "black" }}>
                <span>숫자 포함</span>
                <Ckeckicon />
              </div>

              <div style={ckSpc ? { fill: "#4FAAFF", color: "#4FAAFF" } : { fill: "black", color: "black" }}>
                <span>특수문자 포함</span>
                <Ckeckicon />
              </div>

              <div style={ckLen ? { fill: "#4FAAFF", color: "#4FAAFF" } : { fill: "black", color: "black" }}>
                <span>
                  8자리이상
                  <Ckeckicon />
                </span>
              </div>
            </StCheck>

            <SignInput
              type="password"
              name="ckpassword"
              placeholder="비밀번호 확인"
              onChange={handleChange}
              value={ckpassword}
            />
            <StCheckPass>
              <div style={ckCorrect ? { fill: "#4FAAFF", color: "#4FAAFF" } : { fill: "black", color: "black" }}>
                <span>비밀번호 확인</span>
                <Ckeckicon />
              </div>
            </StCheckPass>
            <Button width="300px" height="60px" text="다음" bgcolor="orange" txtcolor="white" round="round" />
          </form>
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

const SignInput = styled.input`
  width: 460px;
  outline: none;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.white};
  color: black;
  margin-bottom: 1rem;
  /* 크기 */
  height: 44px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  padding-left: 24px;
`;

const StCheck = styled.div`
  margin-bottom: 15px;
  margin-left: 0rem;
  width: 20rem;

  & span {
    font-size: 12px;
  }
  & div {
    display: inline-block;
    text-align: center;
  }
`;

const StCheckPass = styled.div`
  margin-bottom: 15px;
  margin-left: -6.5rem;
  width: 20rem;

  & span {
    font-size: 12px;
  }
`;
