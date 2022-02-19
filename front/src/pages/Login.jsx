import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginState } from "../store/atom";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginInput from "../components/common/LoginInput";
import Button from "../components/common/Button";
import { makeStyles } from "@material-ui/styles";
import { login } from "../api/user";

const useStyles = makeStyles(() => ({
  customStyleOnTab: {
    fontSize: "16px",
    color: "black",
    fontWeight: "bold",
  },
}));
const Login = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const classes = useStyles();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const requestLogin = async (inputs) => {
    await login(inputs).then((res) => {
      if (res.status === 200) {
        setIsLogin(true);
        navigate("/");
      } else {
        alert("Login failed");
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };
    requestLogin(body);
  };

  return (
    <Stbody>
      <StWrapper>
        <StAppBar
          value="form"
          onChange={handleChange}
          aria-label="disabled tabs example"
          centered
          style={{ backgroundColor: "white" }}
          TabIndicatorProps={{ style: { background: "orange" } }}
          classes={{ indicator: classes.customStyleOnTab }}>
          <Tab label={<span className={classes.customStyleOnTab}>Login</span>} value="login" />
          <Tab label="" disabled value="disabled" />
          <Tab label={<span className={classes.customStyleOnTab}>Sign up</span>} value="signup" />
        </StAppBar>
        <StInput>
          <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
            <LoginInput type="text" name="email" placeholder="이메일" onChange={handleChange} value={email} />
            <LoginInput type="text" name="password" placeholder="비밀번호" onChange={handleChange} value={password} />
            <Button
              width="300px"
              height="60px"
              text="로그인"
              bgcolor="orange"
              txtcolor="white"
              round="round"
              type="submit"
            />
          </form>
        </StInput>
      </StWrapper>
    </Stbody>
  );
};

export default Login;
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

const StAppBar = styled(Tabs)`
  position: absolute;
  margin: 60px 0px 0px 130px;
  width: 20rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};
  && {
    // background-color: rgba(0, 0, 0, 0.5);
    color: #ff99a0;
    font-size: 5rem;
    font-weight: 800;
  }
`;

const StInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
`;