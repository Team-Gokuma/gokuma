import { Link } from "react-router-dom";
import styled from "styled-components";
import bookmark from "../asset/img/home/bookmark.png";
import flash from "../asset/img/home/flash.png";
import introTeam from "../asset/img/home/introTeam.png";
import ipad from "../asset/img/home/ipad.png";
import like from "../asset/img/home/like.png";
import refrige from "../asset/img/home/refrige.png";
import shoppingcart from "../asset/img/home/shoppingcart.png";
import shoppinglist from "../asset/img/home/shoppinglist.png";
import sticker from "../asset/img/home/sticker.png";
import store from "../asset/img/home/store.png";
import webBack from "../asset/img/home/webBack.png";
import webFront from "../asset/img/home/webFront.png";

const Home = () => {
  return (
    <>
      <HomeContainer>
        <MainBackground>
          <MainSection>
            <MainContent>
              <div className="mainContentInner">
                <h2 className="mainTitle">오늘도 냉장고에 있는 재료로 뭐 해먹지?</h2>
                <p className="mainText">
                  매일 똑같은 재료로 똑같은 음식 지겹지 않으신가요?
                  <br />
                  지금 냉장고에 있는 재료로 새로운 레시피를 추천해드려요!
                </p>
                <Link to="/recommend" className="mainLink">
                  <p>지금 바로 레시피 추천받기</p>
                </Link>
              </div>
            </MainContent>
            <MainImage>
              <img src={refrige} alt="refrigerator" />
            </MainImage>
          </MainSection>
        </MainBackground>
        <CaptureSection>
          <CaptureImage>
            <img src={flash} alt="flash" className="flash" />
            <img src={ipad} alt="ipad" className="ipad" />
          </CaptureImage>
          <CaptureContent>
            <h2 className="captureTitle">
              사진을 업로드 하면 인공지능이
              <br />
              어떤 재료인지 자동으로 인식해드립니다!
            </h2>
            <p className="captureText">
              냉장고에 있는 재료 사진을 업로드하면
              <br />
              바로 레시피 추천을 받을수 있어요.
            </p>
          </CaptureContent>
        </CaptureSection>
        <RefrigeSection>
          <RefrigeInner>
            <RefrigeImage>
              <img src={webBack} alt="website background" className="webBack" />
              <img src={webFront} alt="website Refrigerator" className="webFront" />
            </RefrigeImage>
            <RefrigeContent>
              <h2 className="refrigeTitle">나의 냉장고에 재료를 넣어보세요!</h2>
              <p className="refrigeContent">
                냉장고에 재료를 입력해두면 냉장고 속 재료를 한눈에 볼 수 있어요.
                <br />
                냉장고의 재료를 기반으로 레시피 추천도 해드립니다.
              </p>
            </RefrigeContent>
          </RefrigeInner>
          <RefrigeBackground></RefrigeBackground>
        </RefrigeSection>
        <ShoppingListSection>
          <ShoppingListContent>
            <div className="ShoppingListcontent">
              <h2>
                냉장고에 어떤 재료가 있는지 확인하며
                <br />
                효율적으로 장보기 리스트를 작성해보세요!
              </h2>
              <p>
                냉장고에 재료를 입력해두면 무슨 재료가 필요한지
                <br />
                한눈에 살펴보며 효율적인 장보기가 가능해집니다.
              </p>
            </div>
          </ShoppingListContent>
          <ShoppingListImage>
            <img src={shoppinglist} alt="shoppinglist" className="shoppinglist" />
            <img src={store} alt="store" className="store" />
            <img src={shoppingcart} alt="shoppingcart" className="shoppingcart" />
          </ShoppingListImage>
        </ShoppingListSection>
        <BookmarkSection>
          <BookmarkImage>
            <img src={like} alt="like" className="like" />
            <img src={bookmark} alt="bookmark" className="bookmark" />
          </BookmarkImage>
          <BookmarkContent>
            <div>
              <h2>
                마음에 드는 레시피는 저장해서
                <br />
                나만의 레시피북을 만들어보세요!
              </h2>
              <p>
                즐겨찾기에 마음에 드는 레시피를 추가하면
                <br />
                취향에 맞는 레시피를 추천받을수 있습니다.
              </p>
            </div>
          </BookmarkContent>
        </BookmarkSection>
        <TeamIntroSection>
          <TeamIntroContent>
            <div className="teamintroContent">
              <p>서비스 만든 사람들이 궁금한가요?!</p>
              <Link to="/teamIntro" className="teamLink">
                Click here ->
              </Link>
            </div>
          </TeamIntroContent>
          <TeanIntroImage>
            <div className="teamImages">
              <img src={introTeam} alt="introTeam" className="introTeam" />
              <img src={sticker} alt="sticker" className="sticker" />
            </div>
          </TeanIntroImage>
        </TeamIntroSection>
      </HomeContainer>
    </>
  );
};

// HOME
const HomeContainer = styled.section`
  h2 {
    ${({ theme }) => theme.font.bold};
    ${({ theme }) => theme.font.xxlarge};
  }
  p {
    ${({ theme }) => theme.font.medium};
  }
  line-height: 1.5;
`;

// MAIN
const MainBackground = styled.div`
  background-color: #f9f9f9;
`;
const MainSection = styled.section`
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  display: flex;
`;
const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 240px;
  .mainTitle {
    margin-bottom: 16px;
  }
  .mainLink {
    display: inline-block;
    width: 266px;
    height: 53px;
    border-radius: 999px;
    text-decoration: none;
    background-color: ${({ theme }) => theme.color.orange};
    margin-top: 38px;
    p {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      color: ${({ theme }) => theme.color.white};
    }
  }
`;
const MainImage = styled.div`
  margin-top: 100px;
  flex: 1;
  img {
    width: 526px;
    height: 584px;
  }
`;

// CAPTURE
const CaptureSection = styled.div`
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  display: flex;
`;
const CaptureImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;

  .flash {
    width: 62px;
    height: 58px;
    position: absolute;
    top: 140px;
    left: 70px;
  }
  .ipad {
    width: 417px;
    height: 378px;
    margin-top: 100px;
  }
`;
const CaptureContent = styled.div`
  flex: 1;
  .captureTitle {
    margin-top: 180px;
    margin-bottom: 12px;
  }
`;

// REFRIGE
const RefrigeSection = styled.section`
  height: 500px;
  position: relative;

  img {
    width: 437px;
    height: 380px;
  }
`;
const RefrigeInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;
const RefrigeImage = styled.div`
  flex: 1;
  position: relative;
  .webBack {
    position: relative;
  }
  .webFront {
    position: absolute;
    top: 30px;
    left: 40px;
  }
`;
const RefrigeContent = styled.div`
  flex: 1;
  margin-top: 120px;
  .refrigeTitle {
    margin-bottom: 12px;
  }
`;
const RefrigeBackground = styled.div`
  width: 100vw;
  height: 218px;
  margin-top: 240px;
  background-color: #f5f5f5;
`;

// SHOPPINGLIST
const ShoppingListSection = styled.section`
  display: flex;
  width: 1200px;
  height: 50vh;
  margin: 0 auto;
`;
const ShoppingListContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 12px;
  }
`;
const ShoppingListImage = styled.div`
  flex: 1;
  position: relative;

  .shoppinglist {
    width: 445px;
    height: 307px;
    position: absolute;
    top: 25%;
    left: 10%;
    z-index: 1;
  }
  .store {
    width: 318px;
    height: 186px;
    position: absolute;
    top: 0%;
    left: 25%;
  }
  .shoppingcart {
    width: 202px;
    height: 248px;
    position: absolute;
    top: 15%;
    left: 65%;
  }
`;

//BOOKMARK
const BookmarkSection = styled.section`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-top: 160px;
`;
const BookmarkImage = styled.div`
  flex: 1;
  position: relative;

  .like {
    width: 104px;
    height: 105px;
    position: absolute;
    top: -40px;
    left: 80px;
  }
  .bookmark {
    width: 378px;
    height: 395px;
  }
`;
const BookmarkContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 12px;
  }
`;

// TEAMINTRO
const TeamIntroSection = styled.div`
  height: 300px;
  height: 140px;
  display: flex;
  margin-top: 200px;
  background-color: ${({ theme }) => theme.color.orange};
`;
const TeamIntroContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .teamLink {
    ${({ theme }) => theme.font.xxlarge};
    ${({ theme }) => theme.font.bold};
    text-decoration: none;
    color: ${({ theme }) => theme.color.black};
  }
`;
const TeanIntroImage = styled.div`
  flex: 1;

  .teamImages {
    position: relative;
  }
  .introTeam {
    width: 276px;
    height: 245px;
    position: absolute;
    bottom: -140px;
    right: 30%;
    z-index: 1;
  }
  .sticker {
    width: 500px;
    height: 400px;
    position: absolute;
    bottom: -80px;
    right: 15%;
  }
`;

export default Home;
