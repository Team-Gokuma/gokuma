import styled from "styled-components";
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
  width: ${600 / 16}rem;
  margin: 10rem auto;
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
    width: ${180 / 16}rem;
    height: ${180 / 16}rem;
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
        left: 170px;
      }
    }
  }
`;

export default Loading;
