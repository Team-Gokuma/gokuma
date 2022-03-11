import styled from "styled-components";
import { useState } from "react";
import { Button } from "../common/Button";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";

const category = [
  { value: "", title: "카테고리 선택" },
  { value: "1", title: "과일" },
  { value: "2", title: "채소" },
  { value: "3", title: "육류 " },
  { value: "4", title: "해산물" },
  { value: "5", title: "유제품" },
  { value: "6", title: "소스류" },
  { value: "7", title: "기타" },
];

// 텍스트로 입력해서 재료 추가 모달창
export const AddByText = ({ handleAddText, addIngredientByText }) => {
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
                addIngredientByText(textValue, selectValue);
                setSelectValue("");
                setTextValue("");
              }}>
              <select
                name="refrigeCategory"
                value={selectValue}
                onChange={(e) => {
                  setSelectValue(e.target.value);
                }}>
                {category.map((item, idx) => {
                  return (
                    <option key={"category" + idx} value={item.value}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
              <input
                type="text"
                value={textValue}
                onChange={(e) => {
                  setTextValue(e.target.value);
                }}
                placeholder="재료명을 한글로 입력해주세요."
              />
              <span type="submit">
                <Button text="추가하기" bgcolor="orange" txtcolor="white" round={true} width="23rem" />
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
  z-index: 3;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  height: 300px;
  background-color: #fff;
  border-radius: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .modalCloseIcon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  h2 {
    ${({ theme }) => theme.font.bold};
    ${({ theme }) => theme.font.large};
    margin-bottom: 40px;
  }
  input {
    margin-left: 1rem;
    width: 240px;
    padding-left: 16px;
    margin-bottom: 32px;
  }
  input,
  select {
    height: 48px;
    color: #757575;
    padding: 0 12px;
  }
`;
