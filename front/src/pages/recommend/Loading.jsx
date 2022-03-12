import styled from "styled-components";
import { media } from "../../styles/theme";

const Loading = () => {
  return (
    <>
      <LoadingContainer>
        <h3 className="findRecipe">Loading...</h3>
        <div className="imgBox">
          <img className="chef" src={`${process.env.PUBLIC_URL}/img/chef.png`} alt="chef" />
          <img src={`${process.env.PUBLIC_URL}/img/refrige.png`} alt="refrige" />
        </div>
      </LoadingContainer>
    </>
  );
};

const LoadingContainer = styled.div`
  width: 600px;
  margin: 160px auto;
  text-align: center;
  position: relative;
  .findRecipe {
    ${({ theme }) => theme.font.xlarge};
    ${({ theme }) => theme.font.bold};
    margin-bottom: 100px;
  }
  .imgBox {
    text-align: right;
  }
  img {
    width: 180px;
    height: 180px;
    margin-right: 120px;
  }
  .chef {
    position: absolute;
    bottom: 0;
    left: 0;
    animation: changeplace 3s linear 1s infinite alternate;

    @keyframes changeplace {
      from {
        left: 0;
      }
      to {
        left: 240px;
      }
    }
  }
  ${media.mobile} {
    width: 100vw;
    img {
      width: 120px;
      height: 120px;
      margin-right: 40px;
    }
    .chef {
      animation: changeplace 3s linear 1s infinite alternate;

      @keyframes changeplace {
        from {
          left: 0;
        }
        to {
          left: 170px;
        }
      }
    }
  }
`;

export default Loading;
