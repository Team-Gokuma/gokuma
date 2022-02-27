import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../store/atom";
import { RefrigeIngredient } from "../components/shoppinglist/RefrigeIngredient";
import { ShopingContent } from "../components/shoppinglist/ShopingContent";
import { AlertLoginModal } from "../components/common/AlertLoginModal";
import { ingredientList } from "../api/refrige";

const ShoppingList = () => {
  const [ingredient, setIngredient] = useState([]);
  const login = window.sessionStorage.getItem("isLogin");
  const onModal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);

  const requestIngredient = async () => {
    const response = await ingredientList();
    if (response.status === 200) {
      setIngredient(response.data.data);
    }
  };

  useEffect(() => {
    requestIngredient();
    !login && setModal(true);
  }, []);

  return (
    <>
      <ShoppingListContainer>
        {onModal && <AlertLoginModal text={"로그인이 필요한 기능입니다!"} btnText={"확인"} />}
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
