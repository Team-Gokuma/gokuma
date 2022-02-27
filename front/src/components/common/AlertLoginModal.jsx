import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../store/atom";
import { Button } from "../../components/common/Button";

export const AlertLoginModal = ({ text, page, btnText, handleClick }) => {
  const setModal = useSetRecoilState(modalState);
  const navigate = useNavigate();
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
              <h4>{text}</h4>
              <p>
                냉장고에 저장해둔 재료를 고려해서
                <br /> 레시피를 추천받을 수 있어요!
              </p>
              <div className="loginModalBtn">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    text={"로그인 하러가기"}
                    bgcolor={"orange"}
                    txtcolor={"white"}
                    round={true}
                    width={"280px"}
                    height={"48px"}
                  />
                </Link>
                <br />
                <span
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setModal(false);
                    handleClick && handleClick();
                    page && navigate(page);
                  }}>
                  <Button
                    text={btnText}
                    bgcolor={"lightgray"}
                    txtcolor={"lightblack"}
                    round={true}
                    width={"280px"}
                    height={"48px"}
                  />
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
      margin-bottom: 1rem;
    }
  }
`;
