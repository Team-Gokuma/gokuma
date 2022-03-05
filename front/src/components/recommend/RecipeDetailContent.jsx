export const RecipeDetailContent = ({ data }) => {
  return (
    <div className="detailRecipeBox">
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
      <h4>관련 동영상</h4>
      <div>
        <iframe
          width="400"
          height="315"
          src={`https://www.youtube.com/embed/${data.video}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>
  );
};
