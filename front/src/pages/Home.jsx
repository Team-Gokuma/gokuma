import styled from "styled-components";

const Home = () => {
  return (
    <>
      <HomeContainer>
        <MainSection>
          <div>home</div>
        </MainSection>
        <CaptureSection></CaptureSection>
        <RefrigeSection></RefrigeSection>
        <ShoppingListSection></ShoppingListSection>
        <BookmarkSection></BookmarkSection>
        <TeamIntroSection></TeamIntroSection>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.section`
  width: 1200px;
  margin: 0 auto;
  border: 1px solid red;
`;
const MainSection = styled.div`
  height: 90vh;
  border: 1px solid blue;
`;
const CaptureSection = styled.div`
  height: 100vh;
  border: 1px solid orange;
`;
const RefrigeSection = styled.div`
  height: 100vh;
  border: 1px solid green;
`;
const ShoppingListSection = styled.div`
  height: 100vh;
  border: 1px solid purple;
`;
const BookmarkSection = styled.div`
  height: 100vh;
  border: 1px solid yellow;
`;
const TeamIntroSection = styled.div`
  height: 30vh;
  border: 1px solid cyan;
`;

export default Home;
