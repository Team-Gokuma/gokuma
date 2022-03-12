import { Link } from "react-router-dom";
import { media } from "../styles/theme";
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
import goToTop from "../asset/img/home/goToTop.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  AOS.init();
  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <HomeContainer>
        <GoTopButton onClick={handleGoTop}>
          <img src={goToTop} alt="go to top" />
          <p>Top</p>
        </GoTopButton>
        <MainBackground>
          <MainSection>
            <MainContent>
              <div className="mainContentInner">
                <h2 className="mainTitle main">오늘도 냉장고에 있는 재료로 뭐 해먹지?</h2>
                <h2 className="mobile">
                  오늘도 냉장고에 있는
                  <br />
                  재료로 뭐 해먹지?
                </h2>
                <p className="mainText main">
                  매일 똑같은 재료로 똑같은 음식 지겹지 않으신가요?
                  <br />
                  지금 냉장고에 있는 재료로 새로운 레시피를 추천해드려요!
                </p>
                <Link to="/recommend" className="mainLink">
                  <p className="main">지금 바로 레시피 추천받기</p>
                  <p className="mobile">레시피 추천받기</p>
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
            <img src={ipad} alt="ipad" className="ipad" data-aos="zoom-in" data-aos-duration="1000" />
          </CaptureImage>
          <CaptureContent>
            <h2 className="captureTitle main">
              사진을 업로드 하면 인공지능이
              <br />
              어떤 재료인지 자동으로 인식해드립니다!
            </h2>
            <h2 className="mobile">
              지금 바로 재료사진을
              <br />
              업로드 해보세요!
            </h2>
            <p className="captureText main">
              냉장고에 있는 재료 사진을 업로드하면
              <br />
              바로 레시피 추천을 받을수 있어요.
            </p>
            <p className="mobile">
              인공지능이 재료를 인식해
              <br />
              레시피를 추천해드려요!
            </p>
          </CaptureContent>
        </CaptureSection>
        <RefrigeSection>
          <RefrigeInner>
            <RefrigeImage>
              <img src={webBack} alt="website background" className="webBack" />
              <img
                src={webFront}
                alt="website Refrigerator"
                className="webFront"
                data-aos="fade-up"
                data-aos-duration="1000"
              />
            </RefrigeImage>
            <RefrigeContent>
              <h2 className="refrigeTitle main">나의 냉장고에 재료를 넣어보세요!</h2>
              <h2 className="mobile">
                냉장고에 재료를 넣고
                <br />
                레시피를 추천받을수 있어요!
              </h2>
              <p className="refrigeContent main">
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
              <h2 className="main">
                냉장고에 어떤 재료가 있는지 확인하며
                <br />
                효율적으로 장보기 리스트를 작성해보세요!
              </h2>
              <h2 className="mobile">
                냉장고에 재료를 확인하며
                <br />
                장보기 리스트를 작성해보세요!
              </h2>
              <p className="main">
                냉장고에 재료를 입력해두면 무슨 재료가 필요한지
                <br />
                한눈에 살펴보며 효율적인 장보기가 가능해집니다.
              </p>
            </div>
          </ShoppingListContent>
          <ShoppingListImage>
            <img
              src={shoppinglist}
              alt="shoppinglist"
              className="shoppinglist"
              data-aos="fade-left"
              data-aos-duration="1000"
            />
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
              <h2 className="main">
                마음에 드는 레시피는 저장해서
                <br />
                나만의 레시피북을 만들어보세요!
              </h2>
              <h2 className="mobile">
                즐겨찾는 레시피를 추가하고
                <br />
                나만의 레시피북을 만들어보세요!
              </h2>
              <p className="main">
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
              <p>서비스를 만든 사람들이 궁금한가요?!</p>
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
  position: relative;
  overflow: hidden;
  h2 {
    ${({ theme }) => theme.font.bold};
    ${({ theme }) => theme.font.xxlarge};
    ${media.tablet} {
      ${({ theme }) => theme.font.xlarge};
    }
    ${media.tablet} {
      ${({ theme }) => theme.font.large};
    }
  }
  p {
    ${({ theme }) => theme.font.medium};
    ${media.tablet} {
      ${({ theme }) => theme.font.normal};
    }
  }
  .mobile {
    display: none;
  }
  ${media.mobile} {
    .main {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
  line-height: 1.5;
  box-sizing: border-box;
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
  ${media.tablet} {
    width: 768px;
    height: 600px;
  }
  ${media.mobile} {
    width: 100vw;
    margin: 0 10px;
    height: 60vw;
  }
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
    .mobile {
      display: none;
    }
  }
  ${media.tablet} {
    flex: 1;
    margin-top: 180px;
    .mainLink {
      width: 240px;
      height: 46px;
      margin-top: 16px;
    }
  }
  ${media.mobile} {
    flex: 1;
    margin: 0 auto;
    margin-top: 16vw;

    .mainLink {
      width: 170px;
      height: 40px;
      .main {
        display: none;
      }
      .mobile {
        display: flex;
      }
    }
  }
`;
const MainImage = styled.div`
  margin-top: 100px;
  flex: 1;
  img {
    width: 526px;
    height: 584px;
    ${media.tablet} {
      width: 360px;
      height: 407px;
    }
    ${media.mobile} {
      width: 30vw;
      height: 36vw;
    }
  }
  ${media.tablet} {
    flex: 0;
  }
  ${media.mobile} {
    margin-top: 40px;
    flex: 1;
  }
`;

// CAPTURE
const CaptureSection = styled.div`
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  display: flex;
  ${media.tablet} {
    width: 768px;
    height: 450px;
    box-sizing: border-box;
  }
  ${media.mobile} {
    width: 100vw;
    height: 40vw;
  }
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
  }
  .ipad {
    width: 417px;
    height: 378px;
    margin-top: 100px;
  }
  ${media.tablet} {
    .flash {
      width: 40px;
      height: 36px;
      top: 160px;
      left: 10px;
    }
    .ipad {
      width: 380px;
      height: 328px;
    }
  }
  ${media.mobile} {
    .flash {
      width: 5vw;
      height: 6vw;
      top: 15vw;
      left: 4vw;
    }
    .ipad {
      width: 40vw;
      height: 38vw;
      margin-top: 10vw;
    }
  }
`;
const CaptureContent = styled.div`
  flex: 1;
  .captureTitle {
    margin-top: 180px;
    margin-bottom: 12px;
  }
  .mobile {
    display: none;
  }
  ${media.tablet} {
    padding-left: 20px;
  }
  ${media.mobile} {
    h2 {
      margin-top: 16vw;
      font-size: 17px;
      margin-bottom: 1vw;
    }
    p {
      font-size: 14px;
    }
    .main {
      display: none;
    }
    .mobile {
      display: block;
    }
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

  ${media.tablet} {
    height: 300px;
    img {
      width: 280px;
      height: 220px;
    }
  }
  ${media.mobile} {
    height: 60vw;
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

  ${media.tablet} {
    width: 768px;
    top: 10%;
    left: 50%;
  }
  ${media.mobile} {
    width: 100vw;
    top: 10%;
  }
`;
const RefrigeImage = styled.div`
  flex: 1;
  .webBack {
    position: relative;
  }
  .webFront {
    position: absolute;
    top: 30px;
    left: 40px;
  }
  ${media.tablet} {
    flex: 0.6;
    .webBack {
      top: 50px;
      left: -15px;
    }
    .webFront {
      top: 70px;
      left: 0px;
    }
  }
  ${media.mobile} {
    .webBack {
      width: 50vw;
      height: 40vw;
    }
    .webFront {
      width: 50vw;
      height: 40vw;
    }
  }
`;
const RefrigeContent = styled.div`
  flex: 1;
  margin-top: 120px;
  .refrigeTitle {
    margin-bottom: 12px;
  }
  ${media.tablet} {
    flex: 1;
  }
  ${media.mobile} {
    margin-top: 24vw;
    h2 {
      font-size: 16px;
      word-break: keep-all;
      padding-left: 1vw;
    }
  }
`;
const RefrigeBackground = styled.div`
  width: 100vw;
  height: 218px;
  margin-top: 240px;
  background-color: #f5f5f5;
  ${media.tablet} {
    height: 180px;
  }
  ${media.mobile} {
    height: 30vw;
    margin-top: 40vw;
  }
`;

// SHOPPINGLIST
const ShoppingListSection = styled.section`
  display: flex;
  width: 1200px;
  height: 50vh;
  margin: 0 auto;
  ${media.tablet} {
    width: 768px;
    height: 40vh;
  }
  ${media.mobile} {
    width: 100vw;
    display: block;
  }
`;
const ShoppingListContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 12px;
  }
  ${media.tablet} {
    flex: 1.1;
  }
  ${media.mobile} {
    flex: 1.4;
    display: inline-block;
    padding-left: 10px;
    font-size: 16px;
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

  ${media.tablet} {
    .shoppinglist {
      width: 305px;
      height: 167px;
      top: 35%;
      left: 0;
    }
    .store {
      width: 238px;
      height: 106px;
      top: 20%;
      left: 10%;
    }
    .shoppingcart {
      width: 122px;
      height: 168px;
      top: 20%;
    }
  }
  ${media.mobile} {
    .shoppinglist {
      width: 50vw;
      height: 30vw;
      bottom: -200px;
      left: 20%;
    }
    .store {
      top: -27px;
      left: 30%;
    }
    .shoppingcart {
    }
  }
`;

//BOOKMARK
const BookmarkSection = styled.section`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-top: 160px;
  ${media.tablet} {
    width: 768px;
  }
  ${media.mobile} {
    display: block;
    width: 100vw;
    margin-top: 0px;
  }
`;
const BookmarkImage = styled.div`
  flex: 1;
  position: relative;

  .like {
    width: 84px;
    height: 85px;
    position: absolute;
    top: -50px;
    left: 100px;
    animation: beatEffect 0.25s ease infinite alternate;
    @keyframes beatEffect {
      from {
      }
      to {
        transform: scale(1.1);
      }
    }
  }
  .bookmark {
    width: 378px;
    height: 395px;
  }
  ${media.mobile} {
    .like {
      width: 15vw;
      height: 15vw;
      top: -10%;
      left: 10%;
    }
    .bookmark {
      width: 52vw;
      height: 60vw;
    }
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
  ${media.mobile} {
    h2 {
      margin-bottom: 20vw;
    }
    display: block;
    text-align: end;
    padding-right: 10vw;
  }
`;

// TEAMINTRO
const TeamIntroSection = styled.div`
  height: 140px;
  display: flex;
  margin-top: 200px;
  background-color: ${({ theme }) => theme.color.orange};

  ${media.mobile} {
    height: 30vw;
    margin-top: 120px;
  }
`;
const TeamIntroContent = styled.div`
  flex: 1.7;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  font-size: 15px;

  .teamLink {
    ${({ theme }) => theme.font.xxlarge};
    ${({ theme }) => theme.font.bold};
    text-decoration: none;
    color: ${({ theme }) => theme.color.black};
    &:hover {
      display: inline-block;
      transform: translateY(-2px);
      opacity: 0.7;
    }
  }
  ${media.mobile} {
    p {
      font-size: 15px;
      word-break: keep-all;
      margin-left: 20px;
    }
    .teamLink {
      margin-left: 20px;
      ${({ theme }) => theme.font.large};
    }
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
    ${media.mobile} {
      width: 35vw;
      height: 33vw;
      bottom: -30vw;
      right: 10%;
    }
  }
  .sticker {
    width: 500px;
    height: 400px;
    position: absolute;
    bottom: -80px;
    right: 15%;
    ${media.mobile} {
      width: 65vw;
      height: 50vw;
      right: 0%;
    }
  }
`;

const GoTopButton = styled.button`
  position: fixed;
  z-index: 2;
  right: 3vw;
  top: 80vh;
  width: 48px;
  height: 48px;
  border: none;
  background-color: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    p {
      display: block;
    }
  }

  img {
    width: 32px;
    height: 32px;
  }
  p {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    display: none;
    color: ${({ theme }) => theme.color.black};
    ${({ theme }) => theme.font.bold};
  }
  ${media.tablet} {
    width: 44px;
    height: 44px;
    top: 90vh;
    p {
      top: 48px;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  ${media.tablet} {
    width: 40px;
    height: 40px;
    img {
      width: 22px;
      height: 22px;
    }
  }
`;

export default Home;
