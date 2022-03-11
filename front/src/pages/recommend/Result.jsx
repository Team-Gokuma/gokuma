import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { useRecoilValue } from "recoil";
import { MobileTitle } from "../../components/mobile/MobileTitle";
import { levelRecipe, cooktimeRecipe } from "../../api/receipe";
import Loading from "./Loading";
import {
  mainRecipesState,
  rankRecipesState,
  editorpickRecipesState,
  bookmarkRecipesState,
  loginState,
} from "../../store/atom";
import { RecipeListResult } from "../../components/recommend/RecipeListResult";

const Result = () => {
  const login = useRecoilValue(loginState);
  const { data: mainRecipes, loading, error } = useRecoilValue(mainRecipesState);
  const rankRecipes = useRecoilValue(rankRecipesState);
  const editorpickRecipes = useRecoilValue(editorpickRecipesState);
  const bookmarkRecipes = useRecoilValue(bookmarkRecipesState);

  const [levelRecipes, setLevelRecipes] = useState();
  const [cooktimeRecipes, setCooktimeRecipes] = useState();

  const levelRecipesList = useMemo(() => {
    return levelRecipes;
  }, [levelRecipes]);

  const cooktimeRecipesList = useMemo(() => {
    return cooktimeRecipes;
  }, [cooktimeRecipes]);

  const requestLevelRecipe = async (level) => {
    const response = await levelRecipe(level);
    if (response.status === 200) {
      setLevelRecipes(response.data.data);
    }
  };
  const requestCooktimeRecipe = async (cooktime) => {
    const response = await cooktimeRecipe(cooktime);
    if (response.status === 200) {
      setCooktimeRecipes(response.data.data);
    }
  };

  const handleLevelList = (value) => {
    requestLevelRecipe(value);
  };
  const handleCooktimeList = (value) => {
    requestCooktimeRecipe(value);
  };

  useEffect(() => {
    requestLevelRecipe(1);
    requestCooktimeRecipe(1);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <MobileTitle text={"레시피 추천받기"} />
      <ResultContainer>
        <h3>재료를 최대한 많이 사용하는 레시피입니다!</h3>
        <RecipeListResult Recipes={mainRecipes} />
        {login && bookmarkRecipes.length > 0 && (
          <>
            <h3 className="relative">회원님이 좋아할만한 레시피입니다!</h3>
            <RecipeListResult Recipes={bookmarkRecipes} />
          </>
        )}
        <h3 className="relative">지금 인기가 많은 레시피입니다!</h3>
        <RecipeListResult Recipes={rankRecipes} />
        <h3 className="relative">에디터가 추천하는 레시피입니다!</h3>
        <RecipeListResult Recipes={editorpickRecipes} />
        <h3 className="relative">
          난이도별 추천 레시피입니다!
          <select
            onChange={(e) => {
              handleLevelList(e.target.value);
            }}>
            <option value={1}>초보환영</option>
            <option value={2}>보통</option>
            <option value={3}>어려움</option>
          </select>
        </h3>
        <RecipeListResult Recipes={levelRecipesList} />
        <h3 className="relative">
          조리시간별 추천 레시피입니다!
          <select
            onChange={(e) => {
              handleCooktimeList(e.target.value);
            }}>
            <option value={1}>25분 안에 후딱</option>
            <option value={2}>30분에서 40분</option>
            <option value={3}>50분이상</option>
          </select>
        </h3>
        <RecipeListResult Recipes={cooktimeRecipesList} />
      </ResultContainer>
    </>
  );
};

export default Result;

const ResultContainer = styled.section`
  width: 1200px;
  margin: 80px auto;

  h3 {
    ${({ theme }) => theme.font.large};
    ${({ theme }) => theme.font.bold};
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .relative {
    margin-top: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  ${media.tablet} {
    width: 90vw;
    margin: 40px auto;
  }
  ${media.mobile} {
    width: 90vw;
    margin: 0px auto;

    h3 {
      ${({ theme }) => theme.font.medium};
    }
  }
`;
