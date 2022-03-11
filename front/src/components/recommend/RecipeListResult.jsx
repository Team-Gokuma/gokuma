import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { Recipe } from "../../components/common/Recipe";

export const RecipeListResult = ({ Recipes }) => {
  const recipelist =
    Recipes &&
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
    });

  return (
    <RecipeList>
      <div className="recipeList">{recipelist}</div>
    </RecipeList>
  );
};

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

  img {
    width: 36px;
    height: 36px;
    position: absolute;
    z-index: 1;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
  .left {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  .right {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
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
