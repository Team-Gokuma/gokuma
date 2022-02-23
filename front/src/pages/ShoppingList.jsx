import styled from "styled-components";
import { useState } from "react";
import { RefrigeIngredient } from "../components/shoppinglist/RefrigeIngredient";
import { ShopingContent } from "../components/shoppinglist/ShopingContent";

const ShoppingList = () => {
  const [ingredient, setIngredient] = useState([
    { name: "사과", ingredient: 1 },
    { name: "팽이버섯", ingredient: 2 },
    { name: "살치살", ingredient: 3 },
    { name: "연어", ingredient: 4 },
    { name: "우유", ingredient: 5 },
    { name: "고추장", ingredient: 6 },
    { name: "와인", ingredient: 7 },
  ]);

  return (
    <>
      <ShoppingListContainer>
        <div>
          <h2>장보기 리스트</h2>
          <ShoppingListBox>
            <RefrigeIngredient ingredient={ingredient} />
            <ShopingContent />
          </ShoppingListBox>
        </div>
      </ShoppingListContainer>
    </>
  );
};

export default ShoppingList;

const ShoppingListContainer = styled.section`
  width: ${740 / 16}rem;
  margin: 0 auto;
  margin-top: ${88 / 16}rem;

  & h2 {
    ${({ theme }) => theme.font.bold};
    ${({ theme }) => theme.font.xlarge};
    margin-bottom: 2rem;
  }
`;
const ShoppingListBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  height: ${520 / 16}rem;
  display: flex;
  background-color: ${({ theme }) => theme.color.white};
  /* color: ${({ theme }) => theme.color.lightblack}; */

  & .titleBox {
    border-bottom: 2px dashed ${({ theme }) => theme.color.darkgray};
    height: ${60 / 16}rem;
    position: relative;

    & h3 {
      padding-left: ${52 / 16}rem;
      padding-top: 1.3rem;
      ${({ theme }) => theme.font.medium};
    }

    & .leftIcon {
      position: absolute;
      top: 1rem;
      left: 1rem;
      fill: ${({ theme }) => theme.color.orange};
    }

    & .deleteIcon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      fill: ${({ theme }) => theme.color.lightblack};
      cursor: pointer;
    }
  }
`;
