import React from 'react';
import styled from 'styled-components';
import kuma from "../../asset/img/profile/kuma.png";
import gitImage from "../../asset/img/profile/git.png";
import { media } from "../../styles/theme";

export default function profile({ image, name, part, intro, git }) {
  return (
    <MemberCard>
      <MemberPicture src={image} />
      <IntroSubTitle>{name}</IntroSubTitle>
      <Part>{part}</Part>
      <Introduction>{intro}</Introduction>
      <a href={git}>
        <Git src={gitImage}></Git>
        </a>
    </MemberCard>
  );
}


const MemberCard = styled.div`
  width: 200px;
  height: 370px;
  position: relative;
  background-color: ${({ theme }) => theme.color.white};;
  border-radius: 20px;
  padding: 120px 10px 10px;
  margin: 0px 1rem 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);

  ${media.mobile} {
    width: 120px;
    height: 240px;
    border-radius: 10px;
    padding: 60px 5px 5px;
    margin: 0px 0.5rem 0.5rem;
    }
  
`;

const IntroSubTitle = styled.h3`
text-align: center
margin-top: 2rem;
font-size: 16px;
color: ${({ theme }) => theme.color.black};
${media.mobile} {
  margin-top: 2.5rem;
  font-size: 10px;
  }
`;

const MemberPicture = styled.img`
  position: absolute;
  width: 150px;
  height:170px;
  top: -50px;
  left: 35px;
  border-radius: 50%;
  ${media.mobile} {
    width: 90px;
    height:110px;
    top: -25px;
    left: 20px;
    }
`;

const Introduction = styled.p`
  color: ${({ theme }) => theme.color.black};
  margin-top: 30px;
  height: 7rem;
  overflow: auto;
  font-size: 18px;
  line-height: 1.2rem;
  ${media.mobile} {
    margin-top: 5px;
    height: 4rem;
    font-size: 10px;
    line-height: 1rem;
    }
`;

const Part = styled.p`
  color: grey;
  font-size: 14px;
  line-height: 16px;
  ${media.mobile} {
    font-size:10px;
    }
`;

const Git = styled.img`
  width: 80px;
  height: 80px;
  display: block; 
  // margin: 0 auto; 
  // margin-bottom:300px;
  margin-top:-30px;
  margin-left:50px;
  background-color: ${({ theme }) => theme.color.white};;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);

  ${media.mobile} {
    width: 40px;
    height: 40px;
    }
`;