import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "styled-tools";
import { Logo } from "../asset/icon";
import { CommonNav } from "./";


const Header = () => {
  const navigate = useNavigate();
  const COMMONNAVS = [
    { id: 0, navText: "레시피 추천받기", navigate: () => navigate("recommend") },
    { id: 1, navText: "고쿠마 냉장고", navigate: () => navigate("refrige") },
    { id: 2, navText: "팀 소개", navigate: () => navigate("teamIntro") },
    { id: 3, navText: "로그인", navigate: () => navigate("login") },
  ];


  return (
    <>
    <StWrapper>
    <LogoWrapper>
    <Logo onClick={() => navigate("/")} />
    </LogoWrapper>
      <TextWrapper>
      고쿠마 냉장고
      </TextWrapper>
      <CommonNav navList={COMMONNAVS}/> 
    </StWrapper>
    </>
  );
};

export default Header;
const LogoWrapper = styled.div`
    width:3rem;
    height:5rem;
    display: flex;
    align-items: center;
`;

const StWrapper = styled.header`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10rem;
      width: 100%;
      height: 5rem;
      background:${theme("colors.yellow")};
      & > span,
      svg {
        cursor: pointer;
      }
    `;
const TextWrapper = styled.div`
      margin-right:auto;
      font-size:2rem;
`

export const StListWrapper = styled.nav`
  display: flex;
`;
