import styled from "styled-components";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";
import { Recommend } from "../recommend/Recommend";

// 사진으로 입력해서 재료 추가 모달창
export const AddByImage = ({ handleAddImage }) => {
  return (
    <div className="ModalContainer">
      <Background>
        <ModalContainer>
          <IconCloseCircle className="modalCloseIcon" onClick={handleAddImage} />
          <Recommend />
        </ModalContainer>
      </Background>
    </div>
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
  height: ${800 / 16}rem;
  background-color: #fff;
  border-radius: 1.5rem;
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
`;
