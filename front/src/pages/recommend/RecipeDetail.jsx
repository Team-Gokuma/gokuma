import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { media } from "../../styles/theme";
import { useRecoilValue } from "recoil";
import { ingredientState, loginState } from "../../store/atom";
import { RecipeDetailContent } from "../../components/recommend/RecipeDetailContent";
import { RecipeDetailInfo } from "../../components/recommend/RecipeDetailInfo";
import { detailRecipe, addLike } from "../../api/receipe";
import { MobileTitle } from "../../components/mobile/MobileTitle";

const RecipeDetail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState();

  const login = useRecoilValue(loginState);
  const ingredients = useRecoilValue(ingredientState);

  const getDetailRecipe = async () => {
    const response = await detailRecipe(id, ingredients.data);
    if (response.status === 200) {
      setDetailData(response.data);
    }
  };

  const clickLike = async () => {
    await addLike(detailData.id);
  };

  useEffect(() => {
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
  width: 1080px;
  padding: 56px 60px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 26px;
  margin: 0 auto;

  ${media.tablet} {
    width: 728px;
  }
  ${media.mobile} {
    width: 100vw;
    padding: 20px;
  }
`;

export default RecipeDetail;
