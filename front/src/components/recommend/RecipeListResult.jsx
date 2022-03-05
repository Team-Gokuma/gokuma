import React, { useEffect, useState } from "react";
import styled from "styled-components";
import right from "../../asset/icon/recipe/result/right.svg";
import left from "../../asset/icon/recipe/result/left.svg";

export const RecipeListResult = ({ Recipes, main }) => {
  return (
    <RecipeList main={main}>
      <img src={left} alt="left" className="left" />
      <div className="recipeListContent">
        <div className="recipeList">{Recipes}</div>
      </div>
      <img src={right} alt="right" className="right" />
    </RecipeList>
  );
};

const RecipeList = styled.div`
  width: 1200px;
  height: ${(props) => (props.main && props.main ? "360px" : "270px")};
  margin-top: 36px;
  position: relative;

  .recipeListContent {
    width: 1080px;
    margin: 0 auto;
    overflow: hidden;
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

  .recipeList {
    width: 3600px;
    display: flex;
    flex-wrap: wrap;
  }
`;
