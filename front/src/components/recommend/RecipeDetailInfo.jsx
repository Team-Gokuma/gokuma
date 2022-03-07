import styled from "styled-components";
import { media } from "../../styles/theme";
import { useEffect, useState } from "react";
import { ReactComponent as IconOutlineFavorite } from "../../asset/icon/favoriteEmpty.svg";
import { ReactComponent as IconFilledFavorite } from "../../asset/icon/favoriteBlack.svg";
import { ReactComponent as IconThumbUp } from "../../asset/icon/thumbUp.svg";
import { saveBookmark } from "../../api/bookmark";

const level = ["초보환영", "보통", "어려움"];

const requestSetBookmark = async (id) => {
  const response = await saveBookmark(id);
  if (response.status === 200) {
    return response.data.data;
  }
};

export const RecipeDetailInfo = ({ data, handleLike }) => {
  const [bookmark, setBookmark] = useState(data.bookmark);
  const [login, setLogin] = useState(true);

  useEffect(() => {
    setLogin(window.sessionStorage.getItem("isLogin"));
  }, []);

  const ingredient = data.ingredient.sort((a, b) => b.inRefrige - a.inRefrige);

  const handleBookmark = () => {
    if (!login) {
      alert("로그인 후 이용이 가능합니다!");
      return;
    }
    setBookmark((bookmark) => !bookmark);
    requestSetBookmark(data.id);
  };

  return (
    <RecipeInfo>
      <div className="detailImgBox">
        <img src={data.img} alt="food" />
      </div>
      <div className="detailInfoBox">
        <h3>
          {data.name}
          {bookmark ? (
            <IconFilledFavorite
              className="bookmarkIcon"
              onClick={handleBookmark}
              fill={"#5AB66A"}
              width={"1.7rem"}
              height={"1.7rem"}
            />
          ) : (
            <IconOutlineFavorite
              className="bookmarkIcon"
              onClick={handleBookmark}
              fill={"#3a3a3a"}
              width={"1.7rem"}
              height={"1.7rem"}
            />
          )}
        </h3>
        <p className="summary">
          <span>{data.summary}</span>
        </p>
        <LikeBox onClick={handleLike} like={data.isLike}>
          <IconThumbUp className="thumbUpIcon" />
          <span>{data.like}</span>
        </LikeBox>
        <div className="infoBox">
          <p className="level">
            난이도 <span className="stars">{level[data.level - 1]}</span>
          </p>
          <p>
            조리시간 <span>{data.time}분</span>
          </p>
          <p className="calories">
            칼로리 <span className="calorieContent">{data.calorie}kcal</span>
          </p>
          <p className="servings">
            기준 <span className="servingsContent">{data.servings}인분</span>
          </p>
        </div>
        <Ingredient>
          <p>재료</p>
          {ingredient.map((item, idx) => {
            return (
              <DetailIngredient key={"detailIngredient" + idx}>
                <IngredientName inRefrige={item.inRefrige}>{item.name}</IngredientName>
                <span>{item.amount}</span>
              </DetailIngredient>
            );
          })}
        </Ingredient>
      </div>
    </RecipeInfo>
  );
};

const RecipeInfo = styled.div`
  display: flex;
  .detailImgBox {
    width: 400px;
    height: 400px;
    margin-left: 30px;
    position: relative;
  }
  .detailInfoBox {
    margin-top: 1rem;
    width: 450px;
    margin-left: 80px;
    p {
      margin-bottom: ${12 / 16}rem;
    }
    h3 {
      display: inline-block;
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      margin-bottom: 1.2rem;
      position: relative;
      .bookmarkIcon {
        position: absolute;
        top: ${-3 / 16}rem;
        right: -2.3rem;
        cursor: pointer;
      }
    }
    .summary {
      margin-bottom: 1.4rem;
      line-height: 1.4;
    }

    .stars {
      margin-left: 4px;
    }
    .calorieContent {
      margin-left: 4px;
    }
    .servings {
      margin-bottom: ${24 / 16}rem;
      & .servingsContent {
        margin-left: 0.7rem;
      }
    }
  }
  .infoBox {
    p {
      margin-right: 4%;
      ${({ theme }) => theme.font.bold};
      span {
        ${({ theme }) => theme.font.normal};
        margin-left: 8px;
      }
    }
  }
  ${media.tablet} {
    .detailImgBox {
      width: 360px;
      height: 360px;
      margin-left: 0;
    }
    .detailInfoBox {
      margin-left: 40px;
    }
  }
  ${media.mobile} {
    display: block;
    .detailImgBox {
      width: 80vw;
      height: 80vw;
      margin: 0 auto;
    }
    .detailInfoBox {
      width: 100%;
      margin-top: 20px;
      margin-left: 0;
      padding: 0 10px;
    }
    .infoBox {
      width: 90vw;
    }
  }
`;

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

  .thumbUpIcon {
    position: absolute;
    top: 3px;
    left: 12px;
    fill: ${(props) => (props.like ? props.theme.color.white : props.theme.color.black)};
  }
  span {
    margin-left: 12px;
    ${({ theme }) => theme.font.normal};
    /* font-size: 1rem; */
  }
`;

const Ingredient = styled.div`
  p {
    ${({ theme }) => theme.font.bold};
  }
`;

const DetailIngredient = styled.span`
  word-break: keep-all;
  margin-right: 12px;
  span {
    word-break: keep-all;
  }
`;

const IngredientName = styled.span`
  background-color: ${(props) => (props.inRefrige ? props.theme.color.orange : props.theme.color.white)};
  color: ${(props) => (props.inRefrige ? props.theme.color.white : props.theme.color.lightblack)};
  border: 1px solid ${(props) => (props.inRefrige ? props.theme.color.white : props.theme.color.darkgray)};
  border-radius: 4px;
  display: inline-block;
  padding: 8px 12px;
  margin-bottom: 1rem;
  margin-right: 8px;
  word-break: keep-all;
  ${media.mobile} {
    padding: 6px 8px;
  }
`;
