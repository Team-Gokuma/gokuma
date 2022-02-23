export const RecipeDetailContent = ({ dummydata }) => {
  return (
    <div className="detailRecipeBox">
      <h4>
        <img src={`${process.env.PUBLIC_URL}/img/cuttongBoard.png`} alt="cuttingBoard" />
        <span>조리방법</span>
      </h4>
      {dummydata.recipe.map((item, idx) => {
        return (
          <div key={"recipe" + idx}>
            <span>{item.step}.</span>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
};
