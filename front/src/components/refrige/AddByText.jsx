import styled from "styled-components";
import { useState } from "react";
import { Button } from "../common/Button";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";

// 텍스트로 입력해서 재료 추가 모달창
export const AddByText = ({ handleAddText, AddIngredientByText }) => {
  const [textValue, setTextValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div className="ModalContainer">
      <Background>
        <ModalContainer>
          <IconCloseCircle className="modalCloseIcon" onClick={handleAddText} />
          <div>
            <h2>식재료 추가하기</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AddIngredientByText(textValue, selectValue);
                setSelectValue("");
                setTextValue("");
              }}>
              <select
                name="refrigeCategory"
                value={selectValue}
                onChange={(e) => {
                  setSelectValue(e.target.value);
                }}>
                <option value="">카테고리 선택</option>
                <option value="1">과일</option>
                <option value="2">채소</option>
                <option value="3">육류</option>
                <option value="4">어류</option>
                <option value="5">유제품</option>
                <option value="6">소스류</option>
                <option value="7">기타</option>
              </select>
              <input
                type={"text"}
                value={textValue}
                onChange={(e) => {
                  setTextValue(e.target.value);
                }}
                placeholder="재료명을 한글로 입력해주세요."
              />
              <span type="submit">
                <Button text={"추가하기"} bgcolor={"orange"} txtcolor={"white"} round={true} width={"23rem"} />
              </span>
            </form>
          </div>
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
  width: ${440 / 16}rem;
  height: ${320 / 16}rem;
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
  & h2 {
    ${({ theme }) => theme.font.bold};
    ${({ theme }) => theme.font.large};
    margin-bottom: ${40 / 16}rem;
  }
  & input {
    margin-left: 1rem;
    width: ${240 / 16}rem;
    padding-left: 1rem;
    margin-bottom: 1.8rem;
  }
  & input,
  select {
    height: ${48 / 16}rem;
    color: #757575;
    padding: 0 0.8rem;
  }
  & form {
    margin-bottom: 2rem;
  }
`;
