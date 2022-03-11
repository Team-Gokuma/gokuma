import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import styled from "styled-components";
import Button from "../../components/common/Button";
import CommonTab from "../../components/common/CommonTab";
import { ReactComponent as Ckeckicon } from "../../asset/icon/check.svg";
import { media } from "../../styles/theme";

const SignupPass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const [pass, setPass] = useState({
    password: "",
    ckpassword: "",
  });

  const { password, ckpassword } = pass;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPass({
      ...pass,
      [name]: value,
    });
  };

  let checkNum = /[0-9]/;
  let checkEng = /[a-zA-Z]/;
  let checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;

  const ckEng = checkEng.test(password) ? true : false;
  const ckNum = checkNum.test(password) ? true : false;
  const ckSpc = checkSpc.test(password) ? true : false;
  const ckLen = password.length >= 8 ? true : false;
  const ckCorrect = password.length !== 0 && password === ckpassword ? true : false;

  // 영어, 숫자, 특수문자, 8자리이상
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ckpassword && ckEng && ckSpc && ckLen && ckNum && ckCorrect) {
      navigate("/SignupNick", { state: { email: email, pass: pass } });
    } else {
      alert("비밀번호를 다시 확인해주세요!");
    }
  };
  const list = [
    { id: 0, ck: ckEng, message: "영어 포함" },
    { id: 1, ck: ckNum, message: "숫자 포함" },
    { id: 2, ck: ckSpc, message: "특수문자 포함" },
    { id: 3, ck: ckLen, message: "8자리이상" },
  ];

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
              {list.map((nav) => (
                <div
                  key={`nav-${nav.id}`}
                  style={nav.ck ? { fill: "#4FAAFF", color: "#4FAAFF" } : { fill: "black", color: "black" }}>
                  <span>{nav.message}</span>
                  <Ckeckicon />
                </div>
              ))}
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
            <PassButton>다음</PassButton>
          </form>
        </StInput>
      </StWrapper>
    </Stbody>
  );
};

export default SignupPass;

const Stbody = styled.div`
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightgray};
`;

const StWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: 100px;
  width: 600px;
  height: 546px;
  box-shadow: 3px 7px 14px rgba(0, 0, 0, 0.05);
  border-radius: ${10 / 16}rem;
  background: ${({ theme }) => theme.color.white};
  ${media.mobile} {
    width: 320px;
    height: 360px;
    left: 20px;
    top: 58px;
  }
`;

const StInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin-bottom: 136px;
  & span {
    margin-top: 136px;
  }
  ${media.mobile} {
    & span {
      margin-top: 100px;
    }
  }
  span{
    ${media.tablet} {
    margin-bottom:20px;
  }
`;

const SignInput = styled.input`
  width: 460px;
  outline: none;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.white};
  color: black;
  margin-bottom: 16px;
  /* 크기 */
  height: 44px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  padding-left: 24px;
  ${media.mobile} {
    position: relative;
    width: 277px;
    height: 40px;
    top: 20px;
    margin-bottom: 5px;
  }
`;

const StCheck = styled.div`
  margin-bottom: 15px;
  margin-left: 0rem;
  width: 20rem;
  ${media.mobile} {
    margin-bottom: 0px;
  }
  ${media.tablet} {
    width: 320px;
  }
  & span {
    font-size: 12px;
    ${media.mobile} {
      font-size: 8px;
    }
  }
  & div {
    display: inline-block;
    text-align: center;
    ${media.mobile} {
      margin-top: 15px;
    }
  }
`;

const StCheckPass = styled.div`
  margin-bottom: 15px;
  margin-left: -6.5rem;
  width: 20rem;

  & span {
    font-size: 12px;
    ${media.mobile} {
      font-size: 8px;
    }
  }
  & div {
    ${media.mobile} {
      margin-top: 15px;
    }
  }
`;

const PassButton = styled.button`
  width: 300px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.color.orange};
  color: ${({ theme }) => theme.color.white};
  cursor: ${(props) => (props.cursor ? props.cursor : "pointer")};
  ${media.mobile} {
    position: relative;
    width: 278px;
    height: 40px;
    top: 0px;
  }
`;
