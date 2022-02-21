import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconOutlineFavorite } from "../../asset/icon/favoriteEmpty.svg";
import { ReactComponent as IconFilledFavorite } from "../../asset/icon/favoriteBlack.svg";

const RecipeDiv = styled(Link)`
  position: relative;
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${({ theme }) => theme.color.black};
  margin: ${(props) => props.margin};
  background: ${({ theme }) => theme.color.lightgray} url("${process.env.PUBLIC_URL}/img/recipeExample.jpeg") no-repeat;
  background-size: cover;
  border: 1px solid ${({ theme }) => theme.color.lightgray};
  transition-duration: 0.3s;
  transition-property: transform;
  &:hover {
    transform: translateY(-8px);
  }
  & div {
    position: absolute;
    width: 100%;
    padding: 16px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.color.white};
    & :nth-child(2) {
      ${({ theme }) => theme.font.bold};
      padding-top: 8px;
    }
  }
  & .favoriteIcon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
  }
`;

export const Recipe = ({ width, height, text, extratext, margin, image, isFavorite, recipeId }) => {
  const [favorite, setFavorite] = useState(true);

  //TO DO : 즐겨찾기 기능
  useEffect(() => {
    setFavorite(isFavorite);
  }, []);

  return (
    <>
      <RecipeDiv
        to={`/detail/${recipeId}`}
        width={width}
        height={height}
        text={text}
        margin={margin}
        extratext={extratext}
        image={image}>
        {favorite ? (
          <IconOutlineFavorite
            className="favoriteIcon"
            onClick={() => {
              setFavorite(false);
            }}
          />
        ) : (
          <IconFilledFavorite
            className="favoriteIcon"
            fill="#EC6A60"
            onClick={() => {
              setFavorite(true);
            }}
          />
        )}
        <div>
          <h4>{extratext}</h4>
          <h4>{text}</h4>
        </div>
      </RecipeDiv>
    </>
  );
};
