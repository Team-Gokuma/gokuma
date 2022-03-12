import React from "react";
import styled from "styled-components";
import gitImage from "../../asset/img/profile/git.png";
import { media } from "../../styles/theme";

export default function profile({ image, name, part, describe, intro, git }) {
  return (
    <MemberCard>
      <MemberPicture src={image} />
      <IntroSubTitle>{name}</IntroSubTitle>
      <Part>{part}</Part>
      <Describe>{describe}</Describe>
      <Introduction>{intro}</Introduction>
      <a href={git}>
        <Git src={gitImage}></Git>
      </a>
    </MemberCard>
  );
}

const MemberCard = styled.div`
  font-family: "TmoneyRoundWindRegular";
  width: 200px;
  height: 370px;
  position: relative;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 20px;
  padding: 120px 10px 10px;
  margin: 0 20px;
  margin-bottom: 80px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  a {
    display: block;
    text-align: center;
  }
  ${media.table} {
    margin: 0 8px;
    margin-bottom: 80px;
  }

  ${media.mobile} {
    width: 200px;
    height: 400px;
    border-radius: 10px;
    padding: 120px 5px 5px;
  }
`;

const IntroSubTitle = styled.h3`
  padding: 0 10px;
  font-size: 18px;
  margin-top: 10px;
  color: ${({ theme }) => theme.color.black};
  font-family: "TmoneyRoundWindExtraBold";

  ${media.mobile} {
    font-size: 16px;
  }
`;

const MemberPicture = styled.img`
  position: absolute;
  width: 150px;
  height: 150px;
  top: -50px;
  left: 35px;
  border-radius: 50%;
  ${media.mobile} {
    width: 90px;
    height: 110px;
    top: -25px;
    left: 20px;
  }
`;

const Introduction = styled.p`
  color: ${({ theme }) => theme.color.black};
  word-break: keep-all;
  padding: 0 10px;
  height: 120px;
  overflow: auto;
  font-size: 16px;
  line-height: 1.4;

  ${media.mobile} {
    margin-top: 5px;
    font-size: 15px;
    line-height: 1.3;
  }
`;

const Part = styled.p`
  padding: 0 10px;
  font-size: 15px;
  ${media.mobile} {
    font-size: 15px;
  }
`;
const Describe = styled.p`
  padding: 0 10px;
  margin-top: 16px;
`;

const Git = styled.img`
  width: 40px;
  height: 40px;
  display: inline-block;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 20px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
`;
