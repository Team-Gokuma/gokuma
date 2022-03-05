import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { media } from "../../styles/theme";
import { RecipeDetailContent } from "../../components/recommend/RecipeDetailContent";
import { RecipeDetailInfo } from "../../components/recommend/RecipeDetailInfo";
import { detailRecipe, addLike } from "../../api/receipe";
import { MobileTitle } from "../../components/mobile/MobileTitle";

const RecipeDetail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState();
  const [login, setLogin] = useState(true);

  const getDetailRecipe = async () => {
    const response = await detailRecipe(id);
    if (response.status === 200) {
      setDetailData(response.data);
    }
  };

  const clickLike = async () => {
    await addLike(detailData.id);
  };

  useEffect(() => {
    setLogin(window.sessionStorage.getItem("isLogin"));
    getDetailRecipe();
  }, []);

  const handleLike = () => {
    if (!login) {
      alert("로그인 후 이용이 가능합니다!");
      return;
    }
    const getLike = async () => {
      await clickLike();
      await getDetailRecipe();
    };
    getLike();
  };

  return (
    <>
      <MobileTitle text="레시피 추천받기" />
      <RecipeDetailSection>
        <RecipeDetailContainer>
          {detailData && (
            <>
              <RecipeDetailInfo data={detailData} handleLike={handleLike} />
              <RecipeDetailContent data={detailData} />
            </>
          )}
        </RecipeDetailContainer>
      </RecipeDetailSection>
    </>
  );
};

const RecipeDetailSection = styled.section`
  padding: 44px 0;
  background-color: #f0f1f3;

  ${media.mobile} {
    width: 320px;
    padding: 0px;
    background-color: #fff;
  }
`;
const RecipeDetailContainer = styled.div`
  width: ${1080 / 16}rem;
  padding: ${56 / 16}rem ${60 / 16}rem;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1.6rem;
  margin: 0 auto;
  .recipeInfo {
    display: flex;
  }
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
  .detailRecipeBox {
    width: 960px;
    padding: 60px;
    background-color: #f8f8f8;
    margin-top: 100px;
    h4 {
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      margin-bottom: 36px;
      position: relative;
      img {
        width: 48px;
        height: 48px;
      }
      span {
        position: absolute;
        top: 14px;
        left: 60px;
      }
    }
    div {
      margin-bottom: 36px;
      position: relative;
    }
    span:first-child {
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      position: absolute;
      top: 0;
      left: 0;
    }
    p:nth-child(2) {
      margin-left: ${32 / 16}rem;
      ${({ theme }) => theme.font.medium};
      line-height: 1.3;
    }
  }
  ${media.tablet} {
    width: 728px;
    .detailImgBox {
      width: 360px;
      height: 360px;
      margin-left: 0;
    }
    .detailInfoBox {
      margin-left: 40px;
    }
    .detailRecipeBox {
      width: 620px;
      margin-top: 60px;
    }
  }
  ${media.mobile} {
    width: 100vw;
    padding: 20px;

    .recipeInfo {
      display: block;
    }
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
    .detailRecipeBox {
      width: 100%;
      padding: 20px;
      margin-top: 40px;
    }
    .infoBox {
      width: 90vw;

      p {
        margin-right: 4%;
        ${({ theme }) => theme.font.bold};
        span {
          ${({ theme }) => theme.font.normal};
        }
      }
    }
  }
`;

export default RecipeDetail;
