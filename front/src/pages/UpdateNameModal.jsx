import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconCloseCircle } from "../asset/icon/closeCircle.svg";
import { useSetRecoilState } from "recoil";
import { modalState } from "../store/atom";
import { Button } from "../components/common/Button";
import { nameupdate } from "../api/user";

const UpdateNameModal = () => {
  const setModal = useSetRecoilState(modalState);
  const navigate = useNavigate();
  const [newname, setNewname] = useState("");

  const handleChange = (e) => {
    setNewname(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (newname) {
      requestUpdateName(newname);
    } else {
      alert("이름을 입력해주세요!");
    }
  };

  const requestUpdateName = async (newname) => {
    await nameupdate(newname).then((res) => {
      if (res && res.status === 200) {
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
            <IconCloseCircle
              className="modalCloseIcon"
              onClick={() => {
                setModal(false);
              }}
            />
            <div className="content">
              <h4>이름 변경</h4>
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
                <span
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setModal(false);
                    handleClick();
                  }}>
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
export default UpdateNameModal;
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
