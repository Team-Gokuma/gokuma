import styled from "styled-components";
import { Recipe } from "../components/common/Recipe";
import { ReactComponent as IconOutlineFavorite } from "../asset/icon/favoriteEmpty.svg";
import { ReactComponent as IconFilledFavorite } from "../asset/icon/favoriteBlack.svg";

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

const Bookmark = () => {
  return (
    <BookmarkContainer>
      <h3>즐겨찾는 레시피</h3>
      <div className="bookmarkList">
        {dummydata.map((item, idx) => {
          return (
            <Recipe
              key={"recipe" + idx}
              className="recipe"
              width={`${240 / 16}rem`}
              height={`${240 / 16}rem`}
              text={item.title}
              margin={"0 1.8rem"}
              favorite={item.favorite}
              recipeId={idx} // TO DO: API 연결할때 변경
            />
          );
        })}
      </div>
    </BookmarkContainer>
  );
};

export default Bookmark;

const BookmarkContainer = styled.section`
  width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;
  /* border: 1px solid red; */
  & h3 {
    ${({ theme }) => theme.font.xlarge};
    ${({ theme }) => theme.font.bold};
    margin-bottom: ${48 / 16}rem;
    margin-left: 1.8rem;
  }
  & .bookmarkList {
    /* border: 1px solid blue; */
  }
`;
