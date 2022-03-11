import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation, useQueries } from "react-query";
import { MobileTitle } from "../../components/mobile/MobileTitle";
import {
  recommendRecipe,
  rankRecipe,
  editorpick,
  levelRecipe,
  cooktimeRecipe,
  bookmarkRecipe,
} from "../../api/receipe";
import Loading from "./Loading";
import { ingredientState, loginState } from "../../store/atom";
import { RecipeListResult } from "../../components/recommend/RecipeListResult";

const Result = () => {
  const login = useRecoilValue(loginState);
  const ingredients = useRecoilValue(ingredientState);

  const [mainRecipes, setMainRecipes] = useState();
  const [bookmarkRecipes, setBookmarkRecipes] = useState();
  const [rankRecipes, setRankRecipes] = useState();
  const [editorpickRecipes, setEditorpickRecipes] = useState();
  const [level, setLevel] = useState(1);
  const [cooktime, setCooktime] = useState(1);

  const {
    data: levelRecipes,
    isLoading: isLevelRecipesLoading,
    isFetching: isLevelRecipesFetching,
  } = useQuery(["levelRecipes", level], () => levelRecipe(level), {
    select: (payload) => payload.data.data,
    staleTime: Infinity,
  });

  const {
    data: cooktimeRecipes,
    isLoading: isCooktimeRecipesLoading,
    isFetching: isCooktimeRecipesFetching,
  } = useQuery(["cooktimeRecipes", cooktime], () => cooktimeRecipe(cooktime), {
    select: (payload) => payload.data.data,
    staleTime: Infinity,
  });

  const mainRecipeResult = useMutation(recommendRecipe, {
    onSuccess: (data) => {
      setMainRecipes(data.data.data);
    },
  });

  const recipeResult = useQueries(
    [
      {
        queryKey: "rankRecipe",
        queryFn: () => rankRecipe(),
      },
      {
        queryKey: "editorPick",
        queryFn: () => editorpick(),
      },
      {
        queryKey: "bookmarkRecipe",
        queryFn: () => bookmarkRecipe(),
      },
    ],
    {
      staleTime: Infinity,
    },
  );

  const handleLevelList = (value) => {
    setLevel(value);
  };
  const handleCooktimeList = (value) => {
    setCooktime(value);
  };

  useEffect(() => {
    mainRecipeResult.mutate(ingredients.data);
  }, []);

  useEffect(() => {
    if (recipeResult.every((result) => result.isSuccess)) {
      setRankRecipes(recipeResult[0].data.data.data);
      setEditorpickRecipes(recipeResult[1].data.data.data);
      login && recipeResult[2].data && setBookmarkRecipes(recipeResult[2].data.data.data);
    }
  }, [recipeResult]);

  if (mainRecipeResult.isLoading || recipeResult.some((recipeResult) => recipeResult.isLoading)) {
    return <Loading />;
  }

  return (
    <>
      <MobileTitle text={"레시피 추천받기"} />
      <ResultContainer>
        <h3>재료를 최대한 많이 사용하는 레시피 입니다!</h3>
        <RecipeListResult Recipes={mainRecipes} />
        {login && bookmarkRecipes && (
          <>
            <h3 className="relative">회원님이 좋아할만한 레시피 입니다!</h3>
            <RecipeListResult Recipes={bookmarkRecipes} />
          </>
        )}
        <h3 className="relative">지금 인기가 많은 레시피 입니다!</h3>
        <RecipeListResult Recipes={rankRecipes} />
        <h3 className="relative">에디터가 추천하는 레시피 입니다!</h3>
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
        <RecipeListResult Recipes={levelRecipes} isLoading={isLevelRecipesLoading} />
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
        <RecipeListResult Recipes={cooktimeRecipes} isLoading={isCooktimeRecipesLoading} />
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
