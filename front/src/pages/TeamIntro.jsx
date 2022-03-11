import React from 'react';
import styled from 'styled-components';
import min from "../asset/img/profile/minyoung.png";
import hoo from "../asset/img/profile/hyeonho.png";
import haa from "../asset/img/profile/jeongha.jpg";
import woo from "../asset/img/profile/seowoo.png";
import hoon from "../asset/img/profile/hoon.png";
import Profile from "../components/teamintro/Profile";
import { media } from "../styles/theme";

export default function TeamIntro() {
  return (
    <MypageContainer>
      <Intro>이미지 처리 인공지능 웹 서비스 '어쩔 냉장고'를 만든 Team Gokuma입니다!</Intro>
        <Members>
          <Profile
            image={woo}
            name="장서우"
            part="백엔드 / AI"
            intro="제가 해결하지 못하는 문제는 없습니다. 끝까지 파고들어 해결해낸다! 자네는 백엔드의 신이야"
            git=""
          />
          <Profile
            image={hoon}
            name="장훈"
            part="백엔드 / 프론트엔드"
            intro="백엔드와 프론트엔드를 오가며 양쪽의 문제상황을 이해시켜주는 자네는 코로나 확진자야"
            git=""
          />
          <Profile
            image={min}
            name="이민영"
            part="프론트엔드"
            intro="걱정인형이지만 그 덕에 모두 완성해 내는 자네는 디자인의 신이야"
            git=""
          />
          <Profile
            image={hoo}
            name="전현호"
            part="AI"
            intro="인공지능과 데이터에 대한 지식이 뛰어난 자네가 없었다면 어쩔냉장고는 없었네 자네는 데이터의 신이야"
            git=""
          />
          <Profile
            image={haa}
            name="백정하"
            part="AI"
            intro="냉철한 시각으로 인공지능의 성능을 최대로 끌어내는 능력을 가진 자제는 인공지능의 신이야"
            git=""
          />
       </Members>
    </MypageContainer>
  );
}


const MypageContainer = styled.section`
  position:fixed;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightgray};
`;

const Intro = styled.div`
  font-size:30px;
  font-weight:bold;
  text-align:center;
  margin-top:30px;
  color: ${({ theme }) => theme.color.black};
  ${media.mobile} {
    font-size: 16px;
    }
`;

const Members = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 0 0;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  height:100vh;  
  margin: 0px auto;
  ${media.mobile} {
    height:700px;
    flex-wrap: wrap;
    }
`;