import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { Recipe } from "../../components/common/Recipe";
import { useRecoilValue } from "recoil";
import { MobileTitle } from "../../components/mobile/MobileTitle";
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
  const mainRecipePayload = useRecoilValue(mainRecipesState);
  const rankRecipes = useRecoilValue(rankRecipesState);
  const editorpickRecipes = useRecoilValue(editorpickRecipesState);
  const bookmarkRecipes = useRecoilValue(bookmarkRecipesState);
  const { data: mainRecipes, loading, error } = mainRecipePayload;

  const rankRecipe = rankRecipes.map(({ name, img, id }, idx) => {
    return (
      <Recipe
        key={"recipe" + idx}
        className="recipe"
        width="270px"
        height="270px"
        text={name}
        image={img}
        recipeId={id}
      />
    );
  });
  const editorpickRecipe = editorpickRecipes.map((item, idx) => {
    return (
      <Recipe
        key={"recipe" + idx}
        className="recipe"
        width="270px"
        height="270px"
        text={item.name}
        image={item.img}
        recipeId={item.id}
      />
    );
  });

  const bookmarkRecipe = bookmarkRecipes.map((item, idx) => {
    return (
      <Recipe
        key={"recipe" + idx}
        className="recipe"
        width="270px"
        height="270px"
        text={item.name}
        image={item.img}
        recipeId={item.id}
      />
    );
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const maxIngredientRecipe = mainRecipes.map((item, idx) => {
    return (
      <Recipe
        key={"recipe" + idx}
        className="recipe"
        width="360px"
        height="360px"
        text={item.name}
        image={item.img}
        extratext={`재료를 ${item.ingrdients}개 사용하는 레시피 입니다!`}
        recipeId={item.id}
      />
    );
  });

  return (
    <>
      <MobileTitle text={"레시피 추천받기"} />
      <ResultContainer>
        <h3>재료를 최대한 많이 사용하는 레시피 입니다!</h3>
        <RecipeListResult Recipes={maxIngredientRecipe} main={true} />
        {/* TO DO: 추천 알고리즘 만들고 생성 */}
        {login && bookmarkRecipe.length > 0 && (
          <>
            <h3 className="relative">회원님이 좋아할만한 레시피 입니다!</h3>
            <RecipeListResult Recipes={bookmarkRecipe} />
          </>
        )}
        <h3 className="relative">지금 인기가 많은 레시피 입니다!</h3>
        <RecipeListResult Recipes={rankRecipe} />
        <h3 className="relative">에디터가 추천하는 레시피 입니다!</h3>
        <RecipeListResult Recipes={editorpickRecipe} />
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
