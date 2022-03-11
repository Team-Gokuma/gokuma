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
          {extratext && <h4>재료를 {extratext}개 사용하는 레시피 입니다!</h4>}
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
