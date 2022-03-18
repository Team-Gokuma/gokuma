import React from "react";
import styled from "styled-components";
import min from "../asset/img/profile/minyoung.png";
import hoo from "../asset/img/profile/hyeonho.png";
import haa from "../asset/img/profile/jeongha.jpg";
import woo from "../asset/img/profile/seowoo.png";
import hoon from "../asset/img/profile/hoon.png";
import chefkuma from "../asset/img/chefkuma.png";
import refrigekuma from "../asset/img/refrigekuma.png";
import Profile from "../components/teamintro/Profile";
import { media } from "../styles/theme";

export default function TeamIntro() {
  return (
    <MypageContainer>
      <Intro>
        <p className="main">
          이미지 처리 인공지능 웹 서비스 <span className="logo">'어쩔 냉장고'</span>를 만든
          <br /> <span>Team Gokuma</span>
          입니다!
        </p>
        <p className="mobile">
          이미지 처리 인공지능 웹 서비스 <span className="logo">'어쩔 냉장고'</span>를<br />
          만든
          <span>Team Gokuma</span>입니다!
        </p>
        <RefrigeKumaImage>
          <img src={refrigekuma} alt="logo" />
        </RefrigeKumaImage>
      </Intro>
      <Members>
        <Profile
          image={woo}
          name="장서우"
          part="백엔드 / AI"
          describe="대체불가(代替不可)"
          intro="빛과 소금 정도는 없어도 됩니다. API부터 배포까지 못하는게 없는 만능 해결사
          "
          git="https://github.com/serajang99"
        />
        <Profile
          image={hoon}
          name="장훈"
          part="백엔드 / 프론트엔드"
          describe="수택불문(殊擇不問)"
          intro='원피스는 있긴 한걸까? 하지만 여기, 프론트와 백 모두 가능한 "풀스택은 실.재.한.다"'
          git="https://github.com/wkdal904"
        />
        <Profile
          image={min}
          name="이민영"
          part="팀장 / 프론트엔드"
          describe="부모마음(父母媽廕)"
          intro="우리 서비스에 좋은 기능 하나라도 더 챙겨줘야지. 팀원들의 멘탈케어까지 책임진 프로젝트의 어머니"
          git="https://github.com/minyopi"
        />
        <Profile
          image={hoo}
          name="전현호"
          part="AI /기획"
          describe="일단도전(一旦挑戰)"
          intro="이건 어때요? 저건요?! 아님말고ㅎ 무이자로 대출해주는 아이디어 뱅크. "
          git="https://github.com/cundee"
        />
        <Profile
          image={haa}
          name="백정하"
          part="AI / 백엔드"
          describe="애이아이(愛邇兒二)"
          intro="모델 학습의 비결은 육아에 있다. 데이터 전처리부터 신중하게! 우리 (에이)아이 이쁘죠?"
          git="https://github.com/junghabaek"
        />
      </Members>
      <ChefKumaImage>
        <img src={chefkuma} alt="logo" />
      </ChefKumaImage>
    </MypageContainer>
  );
}

const MypageContainer = styled.section`
  max-width: 1200px;
  margin: 40px auto;
  word-break: keep-all;
  line-height: 1.5;
  position: relative;
  background-color: ${({ theme }) => theme.color.white};
  ${media.tablet} {
    width: 768px;
  }
  ${media.mobile} {
    width: 100vw;
    margin: 0;
  }
`;

const Intro = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: bold;
  margin-top: 80px;
  padding: 0 40px;
  color: ${({ theme }) => theme.color.black};
  .mobile {
    display: none;
  }
  p {
    flex: 2;
  }
  .logo {
    ${({ theme }) => theme.font.logo};
    letter-spacing: 3px;
  }
  span {
    ${({ theme }) => theme.font.bold};
  }
  ${media.tablet} {
    font-size: 20px;
  }
  ${media.mobile} {
    margin-top: 20px;
    display: block;
    font-size: 18px;
    .mobile {
      display: block;
    }
    .main {
      display: none;
    }
  }
`;

const RefrigeKumaImage = styled.div`
  flex: 1;
  img {
    width: 240px;
    height: 140px;
  }
  ${media.mobile} {
    text-align: end;
    img {
      width: 50vw;
      height: 30vw;
    }
  }
`;

const ChefKumaImage = styled.div`
  img {
    width: 300px;
    height: 300px;
  }
  position: absolute;
  right: -100px;
  bottom: 50px;
  animation: movingKuma 2s ease infinite alternate;
  @keyframes movingKuma {
    from {
      right: 0;
    }
    to {
      right: -110px;
    }
  }
  ${media.tablet} {
    @keyframes movingKuma {
    from {
      right: 100px;
    }
    to {
      right: -0px;
    }
  }
  ${media.mobile} {
    display: none;
  }
`;

const Members = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  margin-top: 100px;
  position: relative;
  z-index: 1;

  ${media.tablet} {
    flex-wrap: wrap;
  }
  ${media.mobile} {
    padding: 0;
    margin-top: 60px;
  }
`;
