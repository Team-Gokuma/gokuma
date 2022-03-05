import styled from "styled-components";
import { useEffect } from "react";
import { media } from "../../styles/theme";
import { Link } from "react-router-dom";
import { ReactComponent as IconOutlineFavorite } from "../../asset/icon/favoriteEmpty.svg";
import { ReactComponent as IconFilledFavorite } from "../../asset/icon/favoriteBlack.svg";

export const Recipe = ({ width, height, text, extratext, margin, image, isFavorite, recipeId }) => {
  // TO DO : 결과 리스트에서도 즐겨찾기에 등록했는지 확인하게 하기
  // const [favorite, setFavorite] = useState(true);

  //TO DO : 즐겨찾기 기능
  useEffect(() => {
    // setFavorite(isFavorite);
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
        {/* {favorite ? (
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
          )} */}
        <div>
          <h4>{extratext}</h4>
          <h4>{text}</h4>
        </div>
      </RecipeDiv>
    </>
  );
};

const RecipeDiv = styled(Link)`
  position: relative;
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.lightgray} url(${(props) => props.image}) no-repeat;
  background-size: cover;
  border: 1px solid ${({ theme }) => theme.color.lightgray};
  transition-duration: 0.3s;
  transition-property: transform;
  /* margin-right: 5%; */
  margin-bottom: 3%;
  flex-shrink: 0;

  :hover {
    transform: translateY(-8px);
  }
  div {
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
  .favoriteIcon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
  }
  ${media.tablet} {
    margin-right: 2%;
  }
  ${media.mobile} {
    width: 140px;
    height: 140px;

    div {
      padding: 4px;
    }
    h4:first-child {
      display: none;
    }
  }
`;
