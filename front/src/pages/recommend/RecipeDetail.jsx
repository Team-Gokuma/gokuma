import styled from "styled-components";
import { RecipeDetailContent } from "../../components/recommend/RecipeDetailContent";
import { RecipeDetailInfo } from "../../components/recommend/RecipeDetailInfo";

const dummydata = {
  name: "달걀볶음밥",
  like: 27,
  isLike: true,
  level: "3",
  servings: "2인분",
  bookmark: true,
  ingredient: [
    { name: "달걀", amount: "2개", inRefrige: true },
    { name: "참기름", amount: "적당량", inRefrige: false },
    { name: "들기름", amount: "적당량", inRefrige: true },
    { name: "소금", amount: "1/2 숟가락", inRefrige: false },
    { name: "후추", amount: "적당량", inRefrige: true },
  ],
  inRefrige: ["달걀", "참기름", "소금"],
  recipe: [
    {
      step: 1,
      content:
        "기름을 둘러 파를 볶아 파기름을 내주세요. 파기름이 튀지 않게 조심해주세요. 파기름을 내면 한층 더 맛이 풍부해진답니다.",
    },
    {
      step: 2,
      content: "기름을 둘러 파를 볶아 파기름을 내주세요. ",
    },
    {
      step: 3,
      content:
        "기름을 둘러 파를 볶아 파기름을 내주세요. 기름을 둘러 파를 볶아 파기름을 내주세요. 기름을 둘러 파를 볶아 파기름을 내주세요. 기름을 둘러 파를 볶아 파기름을 내주세요. 기름을 둘러 파를 볶아 파기름을 내주세요. 기름을 둘러 파를 볶아 파기름을 내주세요. ",
    },
    {
      step: 4,
      content: "기름을 둘러 파를 볶아 파기름을 내주세요. 기름을 둘러 파를 볶아 파기름을 내주세요.  ",
    },
  ],
};

const RecipeDetail = () => {
  return (
    <RecipeDetailSection>
      <RecipeDetailContainer>
        <RecipeDetailInfo dummydata={dummydata} />
        <RecipeDetailContent dummydata={dummydata} />
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
  & .recipeInfo {
    display: flex;
  }
  & .detailImgBox {
    width: ${400 / 16}rem;
    height: ${400 / 16}rem;
    margin-left: ${30 / 16}rem;
    position: relative;
    & .bookmarkIcon {
      position: absolute;
      top: 1rem;
      left: 1rem;
      cursor: pointer;
    }
  }
  & .detailInfoBox {
    margin-top: 1rem;
    width: ${450 / 16}rem;
    margin-left: 80px;
    & p {
      margin-bottom: ${12 / 16}rem;
    }
    & h3 {
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      margin-bottom: 1.8rem;
    }
    & .level {
      position: relative;
      & .stars {
        position: absolute;
        top: -0.4rem;
        left: 3.3rem;
      }
    }
    & .servings {
      margin-bottom: ${24 / 16}rem;
      & .servingsContent {
        margin-left: 0.7rem;
      }
    }
    & .ingredient {
      word-break: break-all;
      & span:nth-child(2) {
        margin-right: ${20 / 16}rem;
      }
    }
  }
  & .detailRecipeBox {
    width: ${960 / 16}rem;
    padding: ${60 / 16}rem;
    background-color: #f8f8f8;
    margin-top: 100px;
    & h4 {
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      margin-bottom: ${36 / 16}rem;
      position: relative;
      & img {
        width: ${48 / 16}rem;
        height: ${48 / 16}rem;
      }
      & span {
        position: absolute;
        top: ${14 / 16}rem;
        left: ${60 / 16}rem;
      }
    }
    & div {
      margin-bottom: ${36 / 16}rem;
      position: relative;
    }
    & span:first-child {
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.large};
      position: absolute;
      top: 0;
      left: 0;
    }
    & p:nth-child(2) {
      margin-left: ${32 / 16}rem;
      ${({ theme }) => theme.font.medium};
      line-height: 1.3;
    }
  }
`;

export default RecipeDetail;
