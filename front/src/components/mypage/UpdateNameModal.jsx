import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../store/atom";
import { Button } from "../common/Button";
import { nameupdate } from "../../api/user";

export const UpdateNameModal = ({ handleCloseName }) => {
  const setModal = useSetRecoilState(modalState);
  const navigate = useNavigate();
  const [newname, setNewname] = useState("");

  const handleChange = (e) => {
    setNewname(e.target.value);
    console.log(newname);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { newname: newname };
    if (newname) {
      requestUpdateName(body);
    } else {
      alert("이름을 입력해주세요!");
    }
  };
  // 수정은 성공적으로 되지만 바로 반영되는것이 아닌 다시로그인했을때 반영된다

  const requestUpdateName = async (body) => {
    await nameupdate(body).then((res) => {
      if (res && res.status === 200) {
        alert("성공적으로 변경되었습니다.");
        handleCloseName()
        navigate("/mypage");
      } else if (res && res.status !== 200) {
        alert("이름변경에 실패하였습니다!");
      }
    });
  };
  return (
    <>
      <div className="ModalContainer">
        <Background>
          <ModalContainer>
            <IconCloseCircle className="modalCloseIcon" onClick={handleCloseName} />
            <div className="content">
              <h4>닉네임 변경</h4>
              {/* <p>
                냉장고에 저장해둔 재료를 고려해서
                <br /> 레시피를 추천받을 수 있어요!
              </p> */}
              <div className="loginModalBtn">
                <UpadateInput
                  type="text"
                  name="이름"
                  placeholder="수정할 이름을 작성해주세요"
                  onChange={handleChange}></UpadateInput>
                <br />
                <span style={{ textDecoration: "none" }} onClick={handleSubmit}>
                  <Button text="수정하기" bgcolor="orange" txtcolor="white" round={true} width="280px" height="48px" />
                </span>
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
  min-width: ${440 / 16}rem;
  height: ${380 / 16}rem;
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
      margin-bottom: 1.5rem;
    }
    & p {
      font-size: 18px;
      margin-bottom: ${32 / 16}rem;
      line-height: 1.2;
    }
    & .loginModalBtn :first-child {
      margin-top: 16px;
      margin-bottom: 1rem;
    }
  }
`;
const UpadateInput = styled.input`
  width: 319px;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.color.white};
  color: black;
  /* 크기 */
  height: 48px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  padding-left: 24px;
`;
