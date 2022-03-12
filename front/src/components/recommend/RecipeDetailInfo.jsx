import styled from "styled-components";
import { media } from "../../styles/theme";
import { useState } from "react";
import { ReactComponent as IconOutlineFavorite } from "../../asset/icon/favoriteEmpty.svg";
import { ReactComponent as IconFilledFavorite } from "../../asset/icon/favoriteBlack.svg";
import { ReactComponent as IconThumbUp } from "../../asset/icon/thumbUp.svg";
import { ReactComponent as Iconbasket } from "../../asset/icon/basket.svg";
import { saveBookmark } from "../../api/bookmark";
import { lackingrds } from "../../api/shoppinglist";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/atom";

const level = ["초보환영", "보통", "어려움"];

const requestSetBookmark = async (id) => {
  const response = await saveBookmark(id);
  if (response.status === 200) {
    return response.data.data;
  }
};

export const RecipeDetailInfo = ({ data, handleLike }) => {
  const [bookmark, setBookmark] = useState(data.bookmark);
  const login = useRecoilValue(loginState);

  const lackIngredient = data.ingredient
    .filter((item) => !item.inRefrige)
    .map((item) => {
      return { content: item.name };
    });

  const ingredient = data.ingredient.sort((a, b) => b.inRefrige - a.inRefrige);

  const addLackingrds = async (ingredients) => {
    const response = await lackingrds(ingredients);
    if (response.status === 200) {
      return response;
    }
  };

  const handleBookmark = () => {
    if (!login) {
      alert("로그인 후 이용이 가능합니다!");
      return;
    }
    setBookmark((bookmark) => !bookmark);
    requestSetBookmark(data.id);
  };

  const handleAddShoppinglist = () => {
    if (!login) {
      alert("로그인 후 이용이 가능합니다!");
      return;
    }
    addLackingrds(lackIngredient);
    alert("냉장고에 없는 재료를 장보기 리스트에 추가했습니다!");
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
          <AddBtn>
            <AddShoppinglist onClick={handleAddShoppinglist}>
              <span className="img">
                <Iconbasket fill="#7E83D2" />
              </span>
              <span>추가하기</span>
            </AddShoppinglist>
            <span className="description">클릭하면 냉장고에 없는 재료를 장보기 리스트에 넣을 수 있어요! -></span>
          </AddBtn>
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
    margin-top: 16px;
    width: 450px;
    margin-left: 80px;
    p {
      margin-bottom: 12px;
    }
    h3 {
      display: inline-block;
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      margin-bottom: 20px;
      position: relative;
      .bookmarkIcon {
        position: absolute;
        top: -3px;
        right: -36px;
        cursor: pointer;
      }
    }
    .summary {
      margin-bottom: 22px;
      line-height: 1.4;
    }

    .stars {
      margin-left: 4px;
    }
    .calorieContent {
      margin-left: 4px;
    }
    .servings {
      margin-bottom: 24px;
      & .servingsContent {
        margin-left: 12px;
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
      height: 280px;
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
  margin-bottom: 22px;
  border: 1px solid ${(props) => (props.like ? props.theme.color.white : props.theme.color.darkgray)};
  border-radius: 4px;
  padding: 6px 12px;
  padding-top: 8px;
  padding-left: 32px;
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
  }
`;

const Ingredient = styled.div`
  p {
    ${({ theme }) => theme.font.bold};
  }
  position: relative;
`;

const AddBtn = styled.div`
  position: absolute;
  bottom: -50px;
  left: 0px;
  :hover {
    .description {
      display: block;
    }
  }

  .description {
    font-size: 14px;
    word-break: keep-all;
    width: 240px;
    line-height: 1.3;
    padding: 4px;
    display: none;
    position: absolute;
    left: 0;
    bottom: -54px;
    color: ${({ theme }) => theme.color.lightblack};
    border-bottom: 1px solid ${({ theme }) => theme.color.purple};
    background-color: ${({ theme }) => theme.color.white};
    z-index: 1;
  }
`;

const AddShoppinglist = styled.span`
  display: inline-flex;
  width: 120px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.color.lightblack};
  border-radius: 999px;
  padding: 2px 8px;
  cursor: pointer;

  .img {
    width: 28px;
  }
  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-left: 7px;
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
  margin-bottom: 16px;
  margin-right: 8px;
  word-break: keep-all;
  ${media.mobile} {
    padding: 6px 8px;
  }
`;
