import React, { Suspense } from "react";
import styled from "styled-components";
import { Recipe } from "../../components/common/Recipe";
import { useRecoilValue } from "recoil";
import { mainRecipesState } from "../../store/atom";

const Result = () => {
  const LoadingPage = React.lazy(() => import("./FindRecipe")); // 지연 로딩
  const ingredients = useRecoilValue(mainRecipesState);

  const maxIngredientRecipe =
    ingredients &&
    ingredients.slice(0, 3).map((item, idx) => {
      return (
        <Recipe
          key={"recipe" + idx}
          className="recipe"
          width={`${328 / 16}rem`}
          height={`${286 / 16}rem`}
          text={item.name}
          // extratext={`재료를 ${item.ingredientNum}개 사용하는 레시피 입니다!`}
          margin={"0 3rem 0 0"}
          // isFavorite={item.favorite}
          recipeId={item.id} // TO DO: API 연결할때 변경
        />
      );
    });
  const relativeRecipe =
    ingredients &&
    ingredients.slice(3).map((item, idx) => {
      return (
        <Recipe
          key={"recipe" + idx}
          className="recipe"
          width={`${240 / 16}rem`}
          height={`${240 / 16}rem`}
          text={item.title}
          margin={"1.2rem 3.7rem 1.2rem 0"}
          favorite={item.favorite}
          recipeId={idx} // TO DO: API 연결할때 변경
        />
      );
    });

  return (
    <Suspense fallback={<LoadingPage />}>
      <ResultContainer>
        <h3>재료를 최대한 많이 사용하는 레시피 입니다!</h3>
        <div className="recipeList">{maxIngredientRecipe}</div>
        {/* TO DO: 추천 알고리즘 만들고 생성 */}
        {/* <h3>좋아요를 많이 받은 레시피 입니다!</h3>
        <div className="recipeList">{maxIngredientRecipe}</div>
        <h3>조리시간이 짧은 레시피 입니다!</h3>
        <div className="recipeList">{maxIngredientRecipe}</div> */}
        <h3 className="relative">관련 레시피 결과</h3>
        <div className="recipeList">{relativeRecipe}</div>
      </ResultContainer>
    </Suspense>
  );
};

export default Result;

const ResultContainer = styled.section`
  width: ${1200 / 16}rem;
  margin: 0 auto;
  margin-top: ${80 / 16}rem;
  & h3 {
    ${({ theme }) => theme.font.large};
    ${({ theme }) => theme.font.bold};
    margin-top: 40px;
  }
  & .recipeList {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 36px;
    justify-content: flex-start;
  }
  & .relative {
    margin-top: 80px;
  }
`;
