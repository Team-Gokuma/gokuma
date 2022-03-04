import styled from "styled-components";
import { media } from "../styles/theme";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../store/atom";
import { RefrigeIngredient } from "../components/shoppinglist/RefrigeIngredient";
import { ShopingContent } from "../components/shoppinglist/ShopingContent";
import { AlertLoginModal } from "../components/common/AlertLoginModal";
import { Toast } from "../components/common/Toast";
import { ingredientList } from "../api/refrige";
import { MobileTitle } from "../components/mobile/MobileTitle";
import { MobileTap } from "../components/mobile/MobileTap";

const ShoppingList = () => {
  const [ingredient, setIngredient] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [onTap1, setOnTap1] = useState(false);
  const [onTap2, setOnTap2] = useState(true);

  const onToast = () => {
    setIsActive(true);
  };

  const OffToast = () => {
    setIsActive(false);
  };

  const onModal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);

  const requestIngredient = async () => {
    const response = await ingredientList();
    if (response && response.status === 200) {
      setIngredient(response.data.data);
    } else {
      setModal(true);
    }
  };

  const handleTap = () => {
    setOnTap1((onTap1) => !onTap1);
    setOnTap2((onTap2) => !onTap2);
  };

  useEffect(() => {
    requestIngredient();
  }, []);

  return (
    <>
      <MobileTitle text="장보기 리스트" />
      <MobileTap onTap1={onTap1} onTap2={onTap2} handleTap={handleTap} />
      <ShoppingListContainer>
        <Toast
          isActive={isActive}
          OffToast={() => {
            OffToast();
          }}
        />
        {onModal && <AlertLoginModal text="로그인이 필요한 기능입니다!" btnText="확인" />}

        <div>
          <h2>장보기 리스트</h2>
          <ShoppingListBox>
            <RefrigeIngredient ingredient={ingredient} onTap1={onTap1} />
            <ShopingContent
              onTap2={onTap2}
              handleToast={() => {
                onToast();
              }}
            />
          </ShoppingListBox>
        </div>
      </ShoppingListContainer>
    </>
  );
};

export default ShoppingList;

const ShoppingListContainer = styled.section`
  width: 740px;
  margin: 0 auto;
  margin-top: 88px;
  position: relative;

  h2 {
    ${({ theme }) => theme.font.bold};
    ${({ theme }) => theme.font.xlarge};
    margin-bottom: 2rem;
  }
  ${media.mobile} {
    width: 320px;
    margin-top: 20px;

    h2 {
      display: none;
    }
  }
`;
const ShoppingListBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  height: ${520 / 16}rem;
  display: flex;
  background-color: ${({ theme }) => theme.color.white};
  /* color: ${({ theme }) => theme.color.lightblack}; */

  .titleBox {
    border-bottom: 2px dashed ${({ theme }) => theme.color.darkgray};
    height: ${60 / 16}rem;
    position: relative;

    h3 {
      padding-left: ${52 / 16}rem;
      padding-top: 1.3rem;
      ${({ theme }) => theme.font.medium};
    }

    .leftIcon {
      position: absolute;
      top: 1rem;
      left: 1rem;
      fill: ${({ theme }) => theme.color.orange};
    }

    .deleteIcon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      fill: ${({ theme }) => theme.color.lightblack};
      cursor: pointer;
    }
  }
`;
