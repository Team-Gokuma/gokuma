import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RecipeDetailContent } from "../../components/recommend/RecipeDetailContent";
import { RecipeDetailInfo } from "../../components/recommend/RecipeDetailInfo";
import { detailRecipe } from "../../api/receipe";

const RecipeDetail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState();

  useEffect(() => {
    const getDetailRecipe = async () => {
      const response = await detailRecipe(id);
      setDetailData(response.data);
    };
    getDetailRecipe();
  }, []);

  return (
    <RecipeDetailSection>
      <RecipeDetailContainer>
        {detailData && (
          <>
            <RecipeDetailInfo data={detailData} />
            <RecipeDetailContent data={detailData} />
          </>
        )}
      </RecipeDetailContainer>
    </RecipeDetailSection>
  );
};

const RecipeDetailSection = styled.section`
  padding: ${44 / 16}rem 0;
  background-color: #f0f1f3;
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
    width: ${400 / 16}rem;
    height: ${400 / 16}rem;
    margin-left: ${30 / 16}rem;
    position: relative;
  }
  .detailInfoBox {
    margin-top: 1rem;
    width: ${450 / 16}rem;
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
    .ingredient {
      word-break: break-all;
      & span:nth-child(2) {
        margin-right: ${20 / 16}rem;
      }
    }
  }
  .detailRecipeBox {
    width: ${960 / 16}rem;
    padding: ${60 / 16}rem;
    background-color: #f8f8f8;
    margin-top: 100px;
    h4 {
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      margin-bottom: ${36 / 16}rem;
      position: relative;
      img {
        width: ${48 / 16}rem;
        height: ${48 / 16}rem;
      }
      span {
        position: absolute;
        top: ${14 / 16}rem;
        left: ${60 / 16}rem;
      }
    }
    div {
      margin-bottom: ${36 / 16}rem;
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
`;

export default RecipeDetail;
