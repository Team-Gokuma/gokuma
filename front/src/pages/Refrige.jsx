import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { ReactComponent as IconClose } from "../asset/icon/close.svg";
import { ReactComponent as IconDelete } from "../asset/icon/delete.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, modalState } from "../store/atom";
import { AlertLoginModal } from "../components/common/AlertLoginModal";
import { AddByText } from "../components/refrige/AddByText";
import { AddByImage } from "../components/refrige/AddByImage";
import { ingredientList, deleteAllIngredient, deleteIngredient, addIngredient } from "../api/refrige";
import { Toast } from "../components/common/Toast";

const category = ["전체 식재료", "과일", "채소", "육류", "해산물", "유제품", "소스류", "기타"];

const addtInRefrigeByText = async (textValue, category) => {
  const data = [{ content: textValue, category: Number(category) }];
  const response = await addIngredient(data);
  if (response.status === 200) {
    alert("재료를 냉장고에 추가했습니다!");
  } else {
    alert("텍스트로 재료 추가를 실패했습니다.");
  }
};

const deleteAllIngredientInRefrige = async () => {
  const response = await deleteAllIngredient();
  if (response.status === 200) {
    alert("재료가 전부 삭제되었습니다.");
  } else {
    alert("재료 전체 삭제를 실패하였습니다.");
  }
};

const deleteIngredientInRefrige = async (id) => {
  const response = await deleteIngredient(id);
  if (response.status === 200) {
    alert("재료가 삭제되었습니다!");
  } else {
    alert("재료 삭제를 실패했습니다.");
  }
};

const Refrige = () => {
  const [addByImage, setAddByImage] = useState(false);
  const [addByText, setAddByText] = useState(false);
  const [isClicked, setIsClicked] = useState("전체 식재료");
  const [ingredient, setIngredient] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const onModal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);

  const login = window.sessionStorage.getItem("isLogin");

  const getIngredient = async () => {
    const response = await ingredientList();
    if (response && response.status === 200) {
      setIngredient(response.data.data);
    } else {
      setModal(true);
    }
  };

  const addIngredientText = (textValue, category) => {
    const addAndGetList = async () => {
      await addtInRefrigeByText(textValue, category);
      await getIngredient();
    };
    addAndGetList();
  };

  const removeAllIngredient = () => {
    if (!login) {
      alert("로그인 후 이용이 가능합니다!");
      return;
    }
    const inputValue = window.confirm("재료를 전체 삭제 하시겠습니까?");
    const deleteall = async () => {
      await deleteAllIngredientInRefrige();
      await getIngredient();
    };
    inputValue && deleteall();
  };

  const removeIngredient = (id) => {
    const deleteIngredient = async () => {
      await deleteIngredientInRefrige(id);
      await getIngredient();
    };
    deleteIngredient();
  };

  const handleClickCategory = (item) => {
    setIsClicked(item);
  };

  const handleAddText = () => {
    setAddByText(false);
  };

  const handleAddImage = () => {
    setAddByImage(false);
  };

  const onToast = () => {
    setIsActive(true);
  };

  const OffToast = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const getlist = async () => {
      await getIngredient();
    };
    getlist();
  }, []);

  return (
    <RefrigeContainer>
      {onModal && <AlertLoginModal text="로그인이 필요한 기능입니다!" btnText="확인" />}
      {addByImage && <AddByImage handleAddImage={handleAddImage} getIngredient={getIngredient} />}
      {addByText && <AddByText handleAddText={handleAddText} addIngredientByText={addIngredientText} />}
      <Toast
        isActive={isActive}
        OffToast={() => {
          OffToast();
        }}
      />
      <RefrigeTitle>
        <h2>나의 냉장고</h2>
        <div>
          <span
            onClick={() => {
              login && setAddByImage(true);
              !login && onToast();
            }}>
            <Button text="사진으로 추가" bgcolor="orange" txtcolor="white" />
          </span>
          <span
            onClick={() => {
              login && setAddByText(true);
              !login && onToast();
            }}>
            <Button text="직접 입력해서 추가" bgcolor="orange" txtcolor="white" />
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
        <div className="refrigeboxes ingredientSide">
          <div className="deleteIconBox">
            <IconDelete className="deleteIcon" onClick={removeAllIngredient} />
          </div>
          {ingredient.length > 0 &&
            ingredient.map((item, idx) => {
              if (isClicked === category[item.category] || isClicked === category[0])
                return (
                  <RefrigeIngredientBox key={item + idx}>
                    <span className="refrigeIngredient">
                      {item.content}
                      <IconClose
                        className="refrigeIngredientCloseBtn"
                        onClick={() => {
                          removeIngredient(item.id);
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
  width: ${740 / 16}rem;
  margin: 0 auto;
  margin-top: ${88 / 16}rem;
  position: relative;
`;

const RefrigeTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${({ theme }) => theme.font.bold};

  h2 {
    ${({ theme }) => theme.font.xlarge}
  }
  span:first-child {
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

  .refrigeboxes {
    width: 50%;
    &.ingredientSide {
      background-color: ${({ theme }) => theme.color.white};
      border-top-right-radius: ${10 / 16}rem;
      border-bottom-right-radius: ${10 / 16}rem;
    }

    .deleteIconBox {
      text-align: end;
      padding: 1rem 1rem 0 0;
    }
    .deleteIcon {
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
  .noIngredient {
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

  .refrigeIngredient {
    display: inline-block;
    text-decoration: underline;
    position: relative;
    margin-bottom: 1.2rem;

    .refrigeIngredientCloseBtn {
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -1.4rem;
    }
  }
`;
