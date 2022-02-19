import styled from "styled-components";
import { Recipe } from "../../components/common/Recipe";

const dummydata = [
  { title: "달걀볶음밥", ingredientNum: 5, favorite: true },
  { title: "고쿠마덮밥", ingredientNum: 3, favorite: false },
  { title: "치킨", ingredientNum: 2, favorite: false },
  { title: "피자", ingredientNum: 1, favorite: true },
  { title: "짜장면", ingredientNum: 1, favorite: true },
  { title: "달걀후라이", ingredientNum: 1, favorite: true },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
  { title: "달걀후라이", ingredientNum: 0, favorite: false },
];

const Result = () => {
  const maxIngredientRecipe = dummydata.slice(0, 3).map((item, idx) => {
    return (
      <Recipe
        key={"recipe" + idx}
        className="recipe"
        width={`${328 / 16}rem`}
        height={`${286 / 16}rem`}
        text={item.title}
        extraText={`재료를 ${item.ingredientNum}개 사용하는 레시피 입니다!`}
        isFavorite={item.favorite}
      />
    );
  });
  const relativeRecipe = dummydata.slice(3).map((item, idx) => {
    return (
      <Recipe
        key={"recipe" + idx}
        className="recipe"
        width={`${240 / 16}rem`}
        height={`${240 / 16}rem`}
        text={item.title}
        favorite={item.favorite}
      />
    );
  });

  return (
    <ResultContainer>
      <h3>재료를 최대한 많이 사용하는 레시피 입니다!</h3>
      <div className="recipeList">{maxIngredientRecipe}</div>
      <h3>좋아요를 많이 받은 레시피 입니다!</h3>
      <div className="recipeList">{maxIngredientRecipe}</div>
      <h3>조리시간이 짧은 레시피 입니다!</h3>
      <div className="recipeList">{maxIngredientRecipe}</div>
      <h3 className="relative">관련 레시피 결과</h3>
      <div className="recipeList">{relativeRecipe}</div>
    </ResultContainer>
  );
};

export default Result;

const ResultContainer = styled.section`
  width: ${1200 / 16}rem;
  margin: 0 auto;
  margin-top: 60px;
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
