import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";
import { Button } from "../common/Button";
import { passupdate } from "../../api/user";
import { ReactComponent as Ckeckicon } from "../../asset/icon/check.svg";

export const UpdatePassModal = ({ handleClosePass }) => {
  const navigate = useNavigate();
  const [pass, setPass] = useState({
    password: "",
    newpassword: "",
    cknewpassword: "",
  });
  const { password, newpassword, cknewpassword } = pass;
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

  const ckEng = checkEng.test(newpassword) ? true : false;
  const ckNum = checkNum.test(newpassword) ? true : false;
  const ckSpc = checkSpc.test(newpassword) ? true : false;
  const ckLen = newpassword.length >= 8 ? true : false;
  const ckCorrect = newpassword.length !== 0 && newpassword === cknewpassword ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { password: password, newpassword: newpassword };

    if (password === newpassword && password !== "" && newpassword !== "") {
      alert("이전과 다른 비밀번호로 입력해주세요");
    } else {
      if (newpassword === cknewpassword && ckEng && ckSpc && ckLen && ckNum && ckCorrect) {
        requestUpdatePass(body);
      } else {
        alert("비밀번호를 다시 확인해주세요!");
      }
    }
  };

  const requestUpdatePass = async (body) => {
    await passupdate(body).then((res) => {
      if (res && res.status === 200) {
        alert("성공적으로 변경되었습니다.");
        handleClosePass()
        navigate("/mypage");
      } else if (res && res.status !== 200) {
        alert("비밀번호 변경에 실패하였습니다!");
      }
    });
  };

  const list = [
    { id: 0, ck: ckEng, message: "영어 포함" },
    { id: 1, ck: ckNum, message: "숫자 포함" },
    { id: 2, ck: ckSpc, message: "특수문자 포함" },
    { id: 3, ck: ckLen, message: "8자리이상" },
  ];
  return (
    <>
      <div className="ModalContainer">
        <Background>
          <ModalContainer>
            <IconCloseCircle className="modalCloseIcon" onClick={handleClosePass} />
            <div className="content">
              <h4>비밀번호 변경</h4>
              <div className="loginModalBtn">
                <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                  <SignInput
                    type="password"
                    name="password"
                    placeholder="현재 비밀번호"
                    onChange={handleChange}
                    value={password}
                  />
                  <br></br>
                  <SignInput
                    type="password"
                    name="newpassword"
                    placeholder="새로운 비밀번호"
                    onChange={handleChange}
                    value={newpassword}
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
                    name="cknewpassword"
                    placeholder="비밀번호 확인"
                    onChange={handleChange}
                    value={cknewpassword}
                  />
                  <StCheckPass>
                    <div style={ckCorrect ? { fill: "#4FAAFF", color: "#4FAAFF" } : { fill: "black", color: "black" }}>
                      <span>비밀번호 확인</span>
                      <Ckeckicon />
                    </div>
                  </StCheckPass>
                  <br />
                  <span style={{ textDecoration: "none" }}>
                    <Button
                      text={"수정하기"}
                      bgcolor={"orange"}
                      txtcolor={"white"}
                      round={true}
                      width={"280px"}
                      height={"48px"}
                    />
                  </span>
                </form>
              </div>
            </div>
          </ModalContainer>
        </Background>
      </div>
    </>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: ${450 / 16}rem;
  height: ${450 / 16}rem;
  background-color: #fff;
  border-radius: 5%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  & .modalCloseIcon {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    cursor: pointer;
  }
  & div.content {
    & h4 {
      ${({ theme }) => theme.font.bold};
      font-size: 20px;
      margin-top: 40px;
      margin-bottom: 1.5rem;
    }

    & .loginModalBtn :first-child {
      margin-bottom: 1rem;
    }
  }
`;

const StCheck = styled.div`
  margin-bottom: 10px;
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

const SignInput = styled.input`
  width: 319px;
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
const StCheckPass = styled.div`
  margin-bottom: 15px;
  margin-left: -6.5rem;
  width: 20rem;

  & span {
    font-size: 12px;
  }
`;
