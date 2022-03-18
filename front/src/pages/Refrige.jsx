import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { media } from "../styles/theme";
import { ReactComponent as IconClose } from "../asset/icon/close.svg";
import { ReactComponent as IconDelete } from "../asset/icon/delete.svg";
import addByPhotoIcon from "../asset/icon/addByPhoto.svg";
import addByTextIcon from "../asset/icon/addByText.svg";
import menuBook from "../asset/icon/menuBook.svg";
import {
  modalState,
  mainRecipesState,
  rankRecipesState,
  editorpickRecipesState,
  bookmarkRecipesState,
  loginState,
} from "../store/atom";
import { AlertLoginModal } from "../components/common/AlertLoginModal";
import { MobileTitle } from "../components/mobile/MobileTitle";
import { AddByText } from "../components/refrige/AddByText";
import { AddByImage } from "../components/refrige/AddByImage";
import {
  ingredientList,
  deleteAllIngredient,
  deleteIngredient,
  addIngredient,
  timeoverIngredient,
} from "../api/refrige";
import { recommendRecipe, rankRecipe, editorpick, bookmarkRecipe } from "../api/receipe";
import { Toast } from "../components/common/Toast";

const category = ["전체 식재료", "과일", "채소", "육류", "해산물", "유제품", "소스류", "기타"];

const addtInRefrigeByText = async (textValue, category) => {
  const data = [{ content: textValue, category: Number(category) }];
  const response = await addIngredient(data);
  if (response && response.status === 200) {
    alert("재료를 냉장고에 추가했습니다!");
  } else {
    alert("텍스트로 재료 추가를 실패했습니다.");
  }
};
const deleteAllIngredientInRefrige = async () => {
  const response = await deleteAllIngredient();
  if (response && response.status === 200) {
    alert("재료가 전부 삭제되었습니다.");
  } else {
    alert("재료 전체 삭제를 실패하였습니다.");
  }
};

const deleteIngredientInRefrige = async (id) => {
  const response = await deleteIngredient(id);
  if (response && response.status === 200) {
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
  const [timeoverIngredientList, setTimeoverIngredientList] = useState([]);

  const login = useRecoilValue(loginState);
  const onModal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);
  const setMainRecipe = useSetRecoilState(mainRecipesState);
  const setRankRecipe = useSetRecoilState(rankRecipesState);
  const setEditorpickRecipe = useSetRecoilState(editorpickRecipesState);
  const setBookmarkRecipe = useSetRecoilState(bookmarkRecipesState);

  const navigate = useNavigate();

  const getIngredient = async () => {
    const response = await ingredientList();
    if (response && response.status === 200) {
      setIngredient(response.data.data);
    } else {
      setModal(true);
    }
  };

  const getTimeoverIngredient = async () => {
    const response = await timeoverIngredient();
    if (response.status === 200) {
      setTimeoverIngredientList(response.data.data);
    }
  };

  const getRecommendationResult = (ingredients) => {
    const getRecommendation = async (ingredients) => {
      setMainRecipe({ loading: true, data: undefined, error: undefined });
      const response = await recommendRecipe(ingredients);
      if (response.status === 200) {
        setMainRecipe({ loading: false, data: response.data.data, error: undefined });
      } else {
        setMainRecipe({ loading: false, data: undefined, error: new Error("메뉴 추천에 실패하였습니다.") });
      }
    };

    const getRankRecipe = async () => {
      const response = await rankRecipe();
      if (response.status === 200) {
        setRankRecipe(response.data.data);
      }
    };

    const getEditorpick = async () => {
      const response = await editorpick();
      if (response.status === 200) {
        setEditorpickRecipe(response.data.data);
      }
    };

    const getBookmarkRecipe = async () => {
      const response = await bookmarkRecipe();
      if (response.status === 200) {
        setBookmarkRecipe(response.data.data);
      }
    };

    const getResult = async () => {
      Promise.all([getRecommendation(ingredients), getRankRecipe(), getEditorpick(), getBookmarkRecipe()]);
    };
    getResult();
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

  const handleFindRecipe = async () => {
    const data = ingredient.map((item) => {
      return { content: item.content, category: item.category };
    });
    if (ingredient.length === 0) {
      alert("냉장고에 재료를 추가하고 레시피를 추천받아보세요!");
      return;
    }
    login && (await getRecommendationResult(data));
    login && navigate("/result");
    !login && onToast();
  };

  useEffect(() => {
    const getlist = async () => {
      await getIngredient();
      await getTimeoverIngredient();
    };
    getlist();
    setMainRecipe({ loading: false, data: undefined, error: undefined });
  }, []);

  return (
    <>
      <MobileTitle text="나의 냉장고" />
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
        <FindRecipe onClick={handleFindRecipe}>
          <img src={menuBook} alt="menuBook" />
          <div className="findRecipeText">레시피 추천받기</div>
        </FindRecipe>
        <RefrigeTitle>
          <h2>나의 냉장고</h2>
          <div>
            <span
              onClick={() => {
                login && setAddByImage(true);
                !login && onToast();
              }}>
              <img className="addIcon" src={addByPhotoIcon} alt="addByPhotoIcon" />
            </span>
            <span
              onClick={() => {
                login && setAddByText(true);
                !login && onToast();
              }}>
              <img className="addIcon" src={addByTextIcon} alt="addByPhotoIcon" />
            </span>
          </div>
        </RefrigeTitle>
        <RefrigeBox>
          <Refrigeboxes className="categorySide">
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
          </Refrigeboxes>
          <Refrigeboxes className="ingredientSide">
            <div className="deleteIconBox">
              <IconDelete className="deleteIcon" onClick={removeAllIngredient} />
            </div>
            {ingredient.length > 0 &&
              ingredient.map((item, idx) => {
                if (isClicked === category[item.category] || isClicked === category[0])
                  return (
                    <RefrigeIngredientBox key={item + idx}>
                      {timeoverIngredientList.filter((data) => {
                        if (data.content === item.content) return data;
                      }).length > 0 && (
                        <TimeoverAlert>
                          <span className="alertText">냉장고에 넣은지 5일이 지났습니다!</span>
                        </TimeoverAlert>
                      )}
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
              <NoIngredient to="/recommend">
                재료를 저장하고, 냉장고의 재료를 최대한 이용한 레시피를 추천받을 수 있습니다!
                <br />
                <br />
                추천 받으러 가기 ->
              </NoIngredient>
            )}
          </Refrigeboxes>
        </RefrigeBox>
      </RefrigeContainer>
    </>
  );
};

export default Refrige;

const RefrigeContainer = styled.section`
  width: 740px;
  height: 90vh;
  margin: 0 auto;
  margin-top: 88px;
  position: relative;

  ${media.mobile} {
    width: 90vw;
    margin-top: 0;
  }
`;

const RefrigeTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${({ theme }) => theme.font.bold};

  h2 {
    ${({ theme }) => theme.font.xlarge}
  }

  .addIcon {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    cursor: pointer;
  }

  ${media.mobile} {
    h2 {
      display: none;
    }
    div {
      position: absolute;
      top: -40px;
      right: 0px;
    }
  }
`;

const RefrigeBox = styled.div`
  height: 520px;
  background-color: ${({ theme }) => theme.color.gray};
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 28px;
  display: flex;
  position: relative;

  ${media.mobile} {
    height: 400px;
    margin-top: 40px;
  }
`;

const Refrigeboxes = styled.div`
  width: 50%;

  &.ingredientSide {
    background-color: ${({ theme }) => theme.color.white};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.gray};
      opacity: 0.4;
      border-radius: 30px;
    }
  }

  .deleteIconBox {
    text-align: end;
    margin: 16px 16px 0 0;
  }
  .deleteIcon {
    cursor: pointer;
  }

  ${media.mobile} {
    width: 100%;
    &.categorySide {
      width: 80%;
    }
  }
`;

const NoIngredient = styled(Link)`
  color: ${({ theme }) => theme.color.black};
  display: inline-block;
  margin: 56px;
  line-height: 1.5;
  border-bottom-left-radius: 999rem;
  word-break: keep-all;

  ${media.mobile} {
    margin: 0;
    margin: 12px;
  }
`;

const TimeoverAlert = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: #ff4444;
  margin-right: 8px;
  position: relative;
  :hover {
    .alertText {
      display: inline-block;
    }
  }

  .alertText {
    display: none;
    width: 140px;
    word-break: keep-all;
    background-color: ${({ theme }) => theme.color.yellow};
    padding: 4px;
    position: absolute;
    bottom: -56px;
    left: 0;
    z-index: 1;
  }
`;

const FindRecipe = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.color.lightgray};
  border-radius: 9999px;
  position: absolute;
  top: 480px;
  right: 12px;
  z-index: 1;
  cursor: pointer;
  transition-duration: 0.3s;
  transition-property: transform;
  .findRecipeText {
    display: none;
    text-align: center;
  }
  :hover {
    transform: translateY(-8px);
    .findRecipeText {
      display: block;
      word-break: keep-all;
    }
  }
  ${media.mobile} {
    width: 52px;
    height: 52px;
    top: 360px;
    .findRecipeText {
      font-size: 14px;
    }
  }
`;

const Category = styled.span`
  display: inline-block;
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
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const RefrigeIngredientBox = styled.div`
  width: 100%;
  text-align: center;

  .refrigeIngredient {
    display: inline-block;
    text-decoration: underline;
    position: relative;
    margin-bottom: 20px;

    .refrigeIngredientCloseBtn {
      width: 20px;
      height: 20px;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -24px;
    }
  }
`;
