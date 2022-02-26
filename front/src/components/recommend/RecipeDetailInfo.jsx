import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as IconOutlineFavorite } from "../../asset/icon/favoriteEmpty.svg";
import { ReactComponent as IconFilledFavorite } from "../../asset/icon/favoriteBlack.svg";
import { ReactComponent as IconThumbUp } from "../../asset/icon/thumbUp.svg";
import { setbookmark } from "../../api/bookmark";

export const RecipeDetailInfo = ({ data }) => {
  const [like, setLike] = useState(data.isLike);
  const [bookmark, setBookmark] = useState(data.bookmark);
  const level = ["초보환영", "보통", "어려움"];
  const ingredient = data.ingredient.sort((a, b) => b.inRefrige - a.inRefrige);

  const requestSetBookmark = async (id) => {
    const response = await setbookmark(id);
    if (response.status === 200) {
      return response.data.data;
    }
  };

  const handleLike = () => {
    like ? setLike(false) : setLike(true);
  };

  const handleBookmark = () => {
    bookmark ? setBookmark(false) : setBookmark(true);
    requestSetBookmark(data.id);
  };
  return (
    <div className="recipeInfo">
      <div className="detailImgBox">
        {bookmark ? (
          <IconFilledFavorite className="bookmarkIcon" onClick={handleBookmark} />
        ) : (
          <IconOutlineFavorite className="bookmarkIcon" onClick={handleBookmark} />
        )}
        <img src={data.img} alt="food" />
      </div>
      <div className="detailInfoBox">
        <h3>{data.name}</h3>
        <p className="summary">
          <span>{data.summary}</span>
        </p>
        <LikeBox onClick={handleLike} like={like}>
          <IconThumbUp className="thumbUpIcon" />
          <span>{data.like}</span>
        </LikeBox>
        <p className="level">
          난이도 <span className="stars">{level[data.level - 1]}</span>
        </p>
        <p className="calories">
          칼로리 <span className="calorieContent">{data.calorie}kcal</span>
        </p>
        <p className="servings">
          기준 <span className="servingsContent">{data.servings}인분</span>
        </p>
        <div className="ingredient">
          <p>재료</p>
          {ingredient.map((item, idx) => {
            return (
              <span key={"detailIngredient" + idx}>
                <IngredientName inRefrige={item.inRefrige}>{item.name}</IngredientName>
                <span>{item.amount}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LikeBox = styled.span`
  display: inline-block;
  background-color: ${(props) => (props.like ? "#FFB800" : props.theme.color.white)};
  color: ${(props) => (props.like ? props.theme.color.white : props.theme.color.black)};
  margin-bottom: 1.4rem;
  border: 1px solid ${(props) => (props.like ? props.theme.color.white : props.theme.color.darkgray)};
  border-radius: 4px;
  padding: ${6 / 16}rem ${12 / 16}rem;
  padding-top: ${8 / 16}rem;
  padding-left: ${32 / 16}rem;
  position: relative;
  cursor: pointer;

  & .thumbUpIcon {
    position: absolute;
    top: 3px;
    left: 12px;
    fill: ${(props) => (props.like ? props.theme.color.white : props.theme.color.black)};
  }
  & span {
    margin-left: ${12 / 16}rem;
    ${({ theme }) => theme.font.normal};
    font-size: 1rem;
  }
`;
const IngredientName = styled.span`
  background-color: ${(props) => (props.inRefrige ? props.theme.color.orange : props.theme.color.white)};
  color: ${(props) => (props.inRefrige ? props.theme.color.white : props.theme.color.lightblack)};
  border: 1px solid ${(props) => (props.inRefrige ? props.theme.color.white : props.theme.color.darkgray)};
  border-radius: 4px;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  margin-right: ${8 / 16}rem;
`;
