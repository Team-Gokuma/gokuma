import React from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { Link } from "react-router-dom";

const RecipeUnmemoed = ({ width, height, text, extratext, margin, image, recipeId }) => {
  return (
    <>
      <RecipeDiv
        to={`/detail/${recipeId}`}
        width={width}
        height={height}
        text={text}
        margin={margin}
        extratext={extratext}>
        <img src={image} alt="food" />
        <div>
          {extratext && <h4>재료를 {extratext}개 사용하는 레시피 입니다!</h4>}
          <h4>{text}</h4>
        </div>
      </RecipeDiv>
    </>
  );
};

export const Recipe = React.memo(RecipeUnmemoed);

const RecipeDiv = styled(Link)`
  position: relative;
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${({ theme }) => theme.color.black};
  background-size: cover;
  border: 1px solid ${({ theme }) => theme.color.lightgray};
  transition-duration: 0.3s;
  transition-property: transform;
  flex-shrink: 0;

  :hover {
    transform: translateY(-8px);
  }

  img {
    width: 100%;
    height: 90%;
  }

  div {
    position: absolute;
    width: 100%;
    padding: 16px;
    z-index: 1;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.color.white};
    & :last-child {
      ${({ theme }) => theme.font.bold};
      padding-top: 8px;
    }
  }
  .favoriteIcon {
    position: absolute;
    top: 16px;
    left: 16px;
    cursor: pointer;
  }
  ${media.tablet} {
    margin: 0 2%;
    width: 220px;
    height: 220px;
  }
  ${media.mobile} {
    width: 50%;
    height: 50vw;
    margin: 0;

    div {
      padding: 4px;
    }
  }
`;
