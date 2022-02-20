import styled from "styled-components";
import { Button } from "../components/common/Button";
import { ReactComponent as IconClose } from "../asset/icon/close.svg";
import { AlertLoginModal } from "../components/common/AlertLoginModal";
import { loginState, modalState } from "../store/atom";

const category = ["전체 식재료", "과일", "채소", "육류", "어류", "유제품", "소스류", "기타"];
const ingredient = ["과일", "채소", "육류", "어류", "유제품", "소스류", "기타"];

const Refrige = () => {
  return (
    <RefrigeContainer>
      <RefrigeTitle>
        <h2>고쿠마 냉장고</h2>
        <div>
          <span>
            <Button text={"사진으로 추가"} bgcolor={"orange"} txtcolor={"white"} />
          </span>
          <span>
            <Button text={"직접 입력해서 추가"} bgcolor={"orange"} txtcolor={"white"} />
          </span>
        </div>
      </RefrigeTitle>
      <RefrigeBox>
        <div className="refrigeboxes">
          {category.map((item, idx) => {
            return (
              <div className="category" key={"category" + idx}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="refrigeboxes">
          {ingredient.map((item, idx) => {
            return (
              <div className="refrigeIngredientBox" key={item + idx}>
                <span className="refrigeIngredient">
                  {item}
                  <IconClose className="refrigeIngredientCloseBtn" />
                </span>
              </div>
            );
          })}
        </div>
      </RefrigeBox>
    </RefrigeContainer>
  );
};

export default Refrige;

const RefrigeContainer = styled.section`
  width: ${660 / 16}rem;
  margin: 0 auto;
  margin-top: ${88 / 16}rem;
`;

const RefrigeTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${({ theme }) => theme.font.bold}
  & h2 {
    ${({ theme }) => theme.font.xlarge}
  }
  & span:first-child {
    margin-right: ${12 / 16}rem;
  }
`;

const RefrigeBox = styled.div`
  height: ${520 / 16}rem;
  background-color: ${({ theme }) => theme.color.gray};
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  border-radius: ${10 / 16}rem;
  margin: 0 auto;
  margin-top: ${28 / 16}rem;
  display: flex;

  & .refrigeboxes {
    width: 50%;
  }
  & .category {
    ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.color.lightblack};
    width: 100%;
    height: ${100 / category.length}%;
    border-bottom: 0.5px solid ${({ theme }) => theme.color.darkgray};
    border-right: 0.5px solid ${({ theme }) => theme.color.darkgray};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  & .category:last-child {
    border-bottom: none;
  }
  & .refrigeIngredientBox {
    width: 100%;
    text-align: center;
  }
  & .refrigeIngredient {
    display: inline-block;
    text-decoration: underline;
    position: relative;
    margin-bottom: 1.2rem;

    & .refrigeIngredientCloseBtn {
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -1.4rem;
    }
  }
  & .refrigeIngredientBox:first-child {
    margin-top: ${40 / 16}rem;
  }
`;
