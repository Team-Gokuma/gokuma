import styled from "styled-components";
import { media } from "../../styles/theme";
import { useMemo, useState } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  modalState,
  mainRecipesState,
  rankRecipesState,
  editorpickRecipesState,
  ingredientState,
  bookmarkRecipesState,
  loginState,
} from "../../store/atom";
import { ImageFileUpload } from "../common/ImageFileUpload";
import { Button } from "../common/Button";
import { ReactComponent as IconClose } from "../../asset/icon/close.svg";
import { ReactComponent as IconInfo } from "../../asset/icon/info.svg";
import { AlertLoginModal } from "../common/AlertLoginModal";
import { recognition, recommendRecipe, rankRecipe, editorpick, bookmarkRecipe } from "../../api/receipe";
import { addIngredient } from "../../api/refrige";
import { StyledLink } from "../../styles/commonStyle";
import { MobileTitle } from "../mobile/MobileTitle";

const regTag = /^[가-힣]+$/;

const handleAddIngredient = async (data) => {
  const response = await addIngredient(data);
  if (response.status === 200) {
    return response;
  } else {
    alert("저장을 실패했습니다.");
  }
};

export const Recommend = ({ page, handleAddImage, getIngredient }) => {
  const [AddToggle, setAddToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [msg, setMsg] = useState("");
  const [onIcon, setOnIcon] = useState(false);

  const login = useRecoilValue(loginState);
  const [onModal, setOnModal] = useRecoilState(modalState);
  const [ingredient, setIngredient] = useRecoilState(ingredientState);
  const setMainRecipe = useSetRecoilState(mainRecipesState);
  const setRankRecipe = useSetRecoilState(rankRecipesState);
  const setEditorpickRecipe = useSetRecoilState(editorpickRecipesState);
  const setBookmarkRecipe = useSetRecoilState(bookmarkRecipesState);

  const requestRecognition = async (img) => {
    const response = await recognition(img);
    setIngredient((cur) => {
      const newData = { ...cur };
      newData.loading = true;
      newData.data = [];
      return newData;
    });
    if (response.status === 200) {
      setIngredient((cur) => {
        const newData = { ...cur };
        newData.loading = false;
        newData.data = [...newData.data, ...response.data.data];
        return newData;
      });
      setAddToggle(false);
      if (response.data.data.length === 0) {
        alert("인식된 재료가 없습니다!");
        return;
      }
    } else {
      setIngredient({
        loading: false,
        error: undefined,
        data: new Error("인식에 실패하였습니다."),
      });
    }
  };

  const getRecommendationResult = (ingredients) => {
    const getRecommendation = async (ingredients) => {
      setMainRecipe({ loading: true, data: undefined, error: undefined });
      const response = await recommendRecipe(ingredients);
      if (response.status === 200) {
        setMainRecipe({ loading: false, data: response.data.data, error: undefined });
      } else {
        setMainRecipe({ loading: false, data: undefined, error: new Error("메뉴 가져오기 실패하였습니다.") });
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
      } else return;
    };

    const getResult = async () => {
      Promise.all([getRecommendation(ingredients), getRankRecipe(), getEditorpick()]);
      login && (await getBookmarkRecipe());
    };
    getResult();
  };

  const handleClick = () => {
    const handleResult = async () => {
      await handleAddIngredient(ingredient.data);
      await getRecommendationResult(ingredient.data);
    };
    page && ingredient.data.length > 0 && !login && setOnModal(true);
    !login && ingredient.data.length === 0 && alert("사진을 찍거나 텍스트로 글을 추가해보세요!");
    login && ingredient.data.length > 0 && alert("냉장고에 재료를 넣었습니다!");
    login && ingredient.data.length === 0 && alert("새로운 재료가 없다면 냉장고로 가서 레시피 추천받기를 눌러보세요!");
    login && handleResult();
  };

  const handleClickNoLogin = async () => {
    await getRecommendationResult(ingredient.data);
  };

  const hanldeAddIngredient = () => {
    const addIngredient = async () => {
      await handleAddIngredient(ingredient.data);
      await getIngredient();
      alert("냉장고에 재료를 넣었습니다!");
    };
    login && ingredient.data.length > 0 && addIngredient() && handleAddImage();
  };

  const handleToggle = () => {
    setAddToggle(false);
  };

  const saveTags = (e) => {
    e.preventDefault();
    if (regTag.test(inputValue)) {
      setIngredient((cur) => {
        const newData = { ...cur };
        newData.data = [...newData.data, { content: inputValue, category: 7 }];
        return newData;
      });
      setInputValue("");
      setMsg("");
      setOnIcon(false);
    }
    if (inputValue !== "" && !regTag.test(inputValue)) {
      setOnIcon(true);
      setMsg("오타 혹은 한글 외에 다른 글자가 포함되어 있습니다!");
    }
  };

  const removeTag = (item) => {
    setIngredient((cur) => {
      let newData = { ...cur };
      newData.data = newData.data.filter((data) => {
        if (data.content !== item) return data;
      });
      return newData;
    });
  };

  const tagList = useMemo(() => {
    if (!ingredient.data.length) {
      setAddToggle(true);
      return null;
    }
    if (ingredient.data.length > 0) {
      return ingredient.data.map((item, idx) => {
        return (
          <div className="tag" key={idx}>
            <Button text={item.content} bgcolor="orange" txtcolor="white" round={true} padding="0 40px 0 20px" />
            <IconClose
              className="closeIcon"
              onClick={() => {
                removeTag(item.content);
              }}
            />
          </div>
        );
      });
    }
  }, [ingredient.data]);

  return (
    <section>
      {page && <MobileTitle text={"레시피 추천받기"} />}
      <RecommendContainer>
        {page ? (
          <>
            <h2>재료 조합으로 레시피를 추천해드립니다!</h2>
            <p>
              이미지를 업로드 하거나, 원하는 재료를 입력하면
              <br />
              재료 조합으로 만들수 있는 레시피를 찾아드립니다!
            </p>
          </>
        ) : (
          <h2>사진으로 추가하기</h2>
        )}
        <ImageFileUpload
          width="600px"
          height="400PX"
          requestRecognition={requestRecognition}
          setIngredient={setIngredient}
        />
        <div className="btnContainer">
          <div className="btnGroup">
            {AddToggle ? (
              <span onClick={handleToggle} className="addtag">
                <Button text="추가하기" bgcolor="orange" txtcolor="white" round={true} />
              </span>
            ) : (
              <>
                <div className="tags">{tagList}</div>
                <form onSubmit={saveTags}>
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="한글로 재료명을 입력해주세요."
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                  />
                </form>
                <p>
                  {onIcon && <IconInfo className="infoIcon" />}
                  {msg}
                </p>
              </>
            )}
          </div>
          {page ? (
            <StyledLink to={ingredient.data.length > 0 && login ? "/result" : "/recommend"} onClick={handleClick}>
              <Button text="레시피 찾기" bgcolor="yellow" txtcolor="black" width="180px" />
            </StyledLink>
          ) : (
            <span onClick={hanldeAddIngredient}>
              <Button text="식재료 추가하기" bgcolor="yellow" txtcolor="black" width="180px" />
            </span>
          )}
        </div>
      </RecommendContainer>
      {onModal && (
        <AlertLoginModal
          page="/result"
          text="로그인하고 냉장고에 추가 하시겠습니까?"
          btnText="바로 추천받기"
          handleClick={handleClickNoLogin}
        />
      )}
    </section>
  );
};

const RecommendContainer = styled.div`
  width: 740px;
  padding: 60px;
  margin: 0 auto;
  text-align: center;
  border-radius: 16px;

  h2 {
    ${({ theme }) => theme.font.large};
    ${({ theme }) => theme.font.bold};
    margin-bottom: 12px;
  }
  p {
    line-height: 1.5;
  }
  .btnContainer {
  }
  .btnGroup {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .addtag {
      display: inline-block;
      margin-bottom: 32px;
    }
    .tags {
      width: 80%;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .tag {
      margin-right: 8px;
      position: relative;
      margin-bottom: 8px;
      .closeIcon {
        fill: ${({ theme }) => theme.color.white};
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
    form {
      width: 100%;
      input {
        width: 320px;
        height: 44px;
        padding-left: 24px;
        border-radius: 9999px;
        border: 1px solid ${({ theme }) => theme.color.orange};
        margin-bottom: 20px;
      }
    }
    .infoIcon {
      width: 18px;
      height: 18px;
      position: absolute;
      top: 2px;
      left: -24px;
      fill: #d23236;
    }
    p {
      margin-bottom: 32px;
      font-size: 15px;
      position: relative;
      color: #d23236;
    }
  }

  ${media.mobile} {
    width: 100vw;
    padding: 0;
    margin-top: 40px;
    h2 {
      word-break: keep-all;
      word-wrap: break-word;
    }
    p {
      display: none;
    }
  }
`;
