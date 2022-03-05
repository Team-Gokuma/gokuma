import React, { Suspense } from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { Recipe } from "../../components/common/Recipe";
import { useRecoilValue } from "recoil";
import { MobileTitle } from "../../components/mobile/MobileTitle";
import { mainRecipesState, relatedRecipesState } from "../../store/atom";
import { RecipeListResult } from "../../components/recommend/RecipeListResult";

const Result = () => {
  const LoadingPage = React.lazy(() => import("./FindRecipe")); // 지연 로딩
  const mainRecipes = useRecoilValue(mainRecipesState);
  const relatedRecipes = useRecoilValue(relatedRecipesState);

  const maxIngredientRecipe =
    mainRecipes &&
    mainRecipes.map((item, idx) => {
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
  const relativeRecipe =
    relatedRecipes &&
    relatedRecipes.map((item, idx) => {
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

  return (
    <Suspense fallback={<LoadingPage />}>
      <MobileTitle text={"레시피 추천받기"} />
      <ResultContainer>
        <h3>재료를 최대한 많이 사용하는 레시피 입니다!</h3>
        <RecipeListResult Recipes={maxIngredientRecipe} main={true} />
        {/* TO DO: 추천 알고리즘 만들고 생성 */}
        {/* <h3>좋아요를 많이 받은 레시피 입니다!</h3>
        <div className="recipeList">{maxIngredientRecipe}</div>
        <h3>조리시간이 짧은 레시피 입니다!</h3>
        <div className="recipeList">{maxIngredientRecipe}</div> */}
        <h3 className="relative">지금 인기가 많은 레시피 입니다!</h3>
        <RecipeListResult Recipes={relativeRecipe} />
      </ResultContainer>
    </Suspense>
  );
};

export default Result;

const ResultContainer = styled.section`
  width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
  overflow: hidden;

  h3 {
    ${({ theme }) => theme.font.large};
    ${({ theme }) => theme.font.bold};
    margin-top: 40px;
  }
  .relative {
    margin-top: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  ${media.tablet} {
    width: 768px;
  }
  ${media.mobile} {
    width: 320px;
    margin-top: 40px;

    h3 {
      ${({ theme }) => theme.font.medium};
    }
  }
`;
