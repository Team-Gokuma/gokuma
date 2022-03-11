import styled from "styled-components";
import { media } from "../../styles/theme";

export const RecipeDetailContent = ({ data }) => {
  return (
    <DetailRecipeBox>
      <h4>
        <img src={`${process.env.PUBLIC_URL}/img/cuttongBoard.png`} alt="cuttingBoard" />
        <span>조리방법</span>
      </h4>
      {data.recipe.map((item, idx) => {
        return (
          <div key={"recipe" + idx}>
            <span>{item.step}.</span>
            <p>{item.content}</p>
          </div>
        );
      })}
      <h4>
        <img src={`${process.env.PUBLIC_URL}/img/cuttongBoard.png`} alt="cuttingBoard" />
        <span>관련 동영상</span>
      </h4>
      <div>
        <iframe
          className="youtubeVideo"
          width="500"
          height="280"
          src={`https://www.youtube.com/embed/${data.video}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
    </DetailRecipeBox>
  );
};

const DetailRecipeBox = styled.div`
  width: 960px;
  padding: 60px;
  background-color: #f8f8f8;
  margin-top: 120px;
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
    margin-left: 32px;
    ${({ theme }) => theme.font.medium};
    line-height: 1.3;
  }
  ${media.tablet} {
    width: 620px;
    margin-top: 100px;
  }
  ${media.mobile} {
    width: 100%;
    padding: 20px;
    margin-top: 100px;
    .youtubeVideo {
      width: 100%;
      height: 42vw;
    }
  }
`;
