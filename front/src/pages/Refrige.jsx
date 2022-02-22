import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { ReactComponent as IconClose } from "../asset/icon/close.svg";
import { ReactComponent as IconDelete } from "../asset/icon/delete.svg";
import { AlertLoginModal } from "../components/common/AlertLoginModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, modalState } from "../store/atom";
import { AddByText } from "../components/refrige/AddByText";
import { AddByImage } from "../components/refrige/AddByImage";

const category = ["전체 식재료", "과일", "채소", "육류", "어류", "유제품", "소스류", "기타"];

const Refrige = () => {
  const [addByImage, setAddByImage] = useState(false);
  const [addByText, setAddByText] = useState(false);
  const [isClicked, setIsClicked] = useState("전체 식재료");
  const [ingredient, setIngredient] = useState([
    { name: "사과", ingredient: 1 },
    { name: "팽이버섯", ingredient: 2 },
    { name: "살치살", ingredient: 3 },
    { name: "연어", ingredient: 4 },
    { name: "우유", ingredient: 5 },
    { name: "고추장", ingredient: 6 },
    { name: "와인", ingredient: 7 },
  ]);

  function handleClickCategory(item) {
    setIsClicked(item);
  }

  function removeIngredient(idx) {
    setIngredient((cur) => {
      const newArr = [...cur];
      newArr.splice(idx, 1);
      return newArr;
    });
  }

  function handleAddText() {
    setAddByText(false);
  }

  function handleAddImage() {
    setAddByImage(false);
  }

  function AddIngredientByText(textValue, category) {
    setIngredient((cur) => {
      const newArr = [...cur];
      newArr.push({ name: textValue, ingredient: Number(category) });
      return newArr;
    });
  }

  const onModal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);
  // const login = useRecoilValue(loginState);
  const login = true;

  useEffect(() => {
    !login && setModal(true);
  }, []);

  return (
    <RefrigeContainer>
      {onModal && <AlertLoginModal page={"/refrige"} text={"로그인이 필요한 기능입니다!"} btnText={"확인"} />}
      {addByImage && <AddByImage handleAddImage={handleAddImage} />}
      {addByText && <AddByText handleAddText={handleAddText} AddIngredientByText={AddIngredientByText} />}
      <RefrigeTitle>
        <h2>고쿠마 냉장고</h2>
        <div>
          <span
            onClick={() => {
              setAddByImage(true);
            }}>
            <Button text={"사진으로 추가"} bgcolor={"orange"} txtcolor={"white"} />
          </span>
          <span
            onClick={() => {
              setAddByText(true);
            }}>
            <Button text={"직접 입력해서 추가"} bgcolor={"orange"} txtcolor={"white"} />
          </span>
        </div>
      </RefrigeTitle>
      <RefrigeBox>
        <div className="refrigeboxes">
          {category.map((item, idx) => {
            return (
              <Category
                className="category"
                key={"category" + idx}
                value={isClicked === item}
                onClick={() => {
                  handleClickCategory(item);
                }}>
                {item}
              </Category>
            );
          })}
        </div>
        <div className="refrigeboxes">
          <div className="deleteIconBox">
            <IconDelete
              className="deleteIcon"
              onClick={() => {
                setIngredient([]);
              }}
            />
          </div>
          {ingredient.length > 0 &&
            ingredient.map((item, idx) => {
              if (isClicked === category[item.ingredient] || isClicked === category[0])
                return (
                  <RefrigeIngredientBox key={item + idx}>
                    <span className="refrigeIngredient">
                      {item.name}
                      <IconClose
                        className="refrigeIngredientCloseBtn"
                        onClick={() => {
                          removeIngredient(idx);
                        }}
                      />
                    </span>
                  </RefrigeIngredientBox>
                );
            })}
          {ingredient.length === 0 && (
            <Link to="/recommend" className="noIngredient">
              재료를 저장하고, 냉장고의 재료를 최대한 이용한 레시피를 추천받을 수 있습니다!
              <br />
              <br />
              추천 받으러 가기 ->
            </Link>
          )}
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
  ${({ theme }) => theme.font.bold};

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
  position: relative;

  & .refrigeboxes {
    width: 50%;

    & .deleteIconBox {
      text-align: end;
      padding: 1rem 1rem 0 0;
    }
    & .deleteIcon {
      cursor: pointer;
    }
    & :first-child {
      border-top-left-radius: ${10 / 16}rem;
    }
    & :last-child {
      border-bottom: none;
      border-bottom-left-radius: ${10 / 16}rem;
    }
  }
  & .noIngredient {
    color: ${({ theme }) => theme.color.black};
    display: inline-block;
    margin: 3.5rem;
    line-height: 1.5;
    border-bottom-left-radius: 999rem;
  }
`;

const Category = styled.div`
  ${({ theme }) => theme.font.medium};
  ${(props) => props.value && props.theme.font.bold};
  color: ${({ theme }) => theme.color.lightblack};
  background-color: ${(props) => props.value && props.theme.color.white};
  width: 100%;
  height: ${100 / category.length}%;
  border-bottom: 0.5px solid ${({ theme }) => theme.color.darkgray};
  border-right: 0.5px solid ${({ theme }) => theme.color.darkgray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const RefrigeIngredientBox = styled.div`
  width: 100%;
  text-align: center;

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
`;
