import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { Recipe } from "../../components/common/Recipe";

export const RecipeListResult = React.memo(({ Recipes, isLoading = false }) => {
  return (
    <RecipeList>
      {!isLoading && (
        <div className="recipeList">
          {Recipes &&
            Recipes.map(({ name, img, id, ingrdients }, idx) => {
              return (
                <Recipe
                  key={"recipe" + idx}
                  className="recipe"
                  width="270px"
                  height="270px"
                  text={name}
                  image={img}
                  extratext={ingrdients}
                  recipeId={id}
                />
              );
            })}
        </div>
      )}
      {isLoading && <RecipeListSkeleton />}
    </RecipeList>
  );
});

const RecipeListSkeleton = styled.div`
  height: 270px;
  background-color: #f5f5f5;
`;

const RecipeList = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 36px;
  position: relative;
  white-space: nowrap;
  overflow-x: scroll;
  margin: 0 auto;
  &::-webkit-scrollbar {
    height: 8px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.darkgray};
    opacity: 0.4;
    border-radius: 30px;
  }
  .recipeList {
    height: 100%;
    position: relative;
    vertical-align: middle;
  }
  ${media.tablet} {
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ${media.mobile} {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
