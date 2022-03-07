import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CommonNav } from "./";
import { useSetRecoilState } from "recoil";
import { logout, islogin } from "../api/user";
import { mainRecipesState, relatedRecipesState } from "../store/atom";
import { ReactComponent as Logo } from "../asset/icon/header/logo.svg";
import { ReactComponent as Profile } from "../asset/icon/profile.svg";
import menu from "../asset/icon/mobile/menu.svg";
import Button from "../components/common/Button";
import { media } from "../styles/theme";
import { StyledLink } from "../styles/commonStyle";

const Header = () => {
  const [menuToggle, setMenutoggle] = useState(false);
  const navigate = useNavigate();
  const mainRecipes = useSetRecoilState(mainRecipesState);
  const relatedRecipes = useSetRecoilState(relatedRecipesState);
  let name = "";
  let LoginCheck = false;
  const handleLogout = async () => {
    await logout().then((res) => {
      if (res.status !== 404) {
        mainRecipes([]);
        relatedRecipes([]);
        // setIsLogin(false);
        navigate("/");
        setMenutoggle(false);
      } else {
        alert("error");
        return res.msg;
      }
    });
  };
  
  const handleIsLogin = async () => {
    await islogin().then((res) => {
      if(res.status === 200){
        LoginCheck=true;
        name = res.name;
        console.log(name, LoginCheck);
      }
      else if(res.status===404){
        LoginCheck=false;
      }
    });
  };
  
  useEffect(() => {
    console.log(name, LoginCheck);
    handleIsLogin();
  });
  
  const mobileMenuToggle = () => {
    setMenutoggle((menuToggle) => !menuToggle);
  };

  const mobilemenu = useRef();

  
  return (
    <>
      <StWrapper>
        <div className="mobileMenuBtn" onClick={mobileMenuToggle}>
          <img src={menu} alt="mobile menu" />
        </div>
        <LogoWrapper
          onClick={() => {
            navigate("/");
            setMenutoggle(false);
          }}>
          <Img />
          <div className="logo">어쩔냉장고</div>
        </LogoWrapper>
        <div className="nav">
          <CommonNav />
        </div>
        <ProfileWrapper>
          {{LoginCheck} ? (
            <>
              <div className="auth" onClick={handleLogout}>
                <Button width="104px" height="45px" text="Logout" bgcolor="yellow" txtcolor="black" round="round" />
              </div>
              <StyledLink
                to="/mypage"
                className="profile"
                onClick={() => {
                  setMenutoggle(false);
                }}>
                <div className="name" style={{ float: "left", marginTop: "14px", marginRight: "10px" }}>
                  {name}님
                </div>
                <Profile />
              </StyledLink>
            </>
          ) : (
            <>
              <StyledLink to="/login" className="auth">
                <Button text="Login / Sign up" bgcolor="yellow" txtcolor="black" />
              </StyledLink>
              <StyledLink
                to="/login"
                className="profile"
                onClick={() => {
                  setMenutoggle(false);
                }}>
                <Profile />
              </StyledLink>
            </>
          )}
        </ProfileWrapper>
      </StWrapper>
      {menuToggle && (
        <MobileMenu ref={mobilemenu}>
          <CommonNav mobileMenuToggle={mobileMenuToggle} />
        </MobileMenu>
      )}
    </>
  );
};
export default Header;

const StWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 36px;
  height: 5rem;
  background: ${({ theme }) => theme.color.yellow};
  & > span,
  svg {
    cursor: pointer;
  }
  .mobileMenuBtn {
    display: none;
  }
  ${media.tablet} {
    height: 60px;
  }
  ${media.mobile} {
    min-width: 320px;
    height: 60px;
    align-items: center;
    padding-right: 0px;
    box-sizing: border-box;
    position: relative;

    .mobileMenuBtn {
      display: block;
      padding: 16px;
      cursor: pointer;
    }
    .nav {
      display: none;
    }
  }
`;

const LogoWrapper = styled.h1`
  margin-right: ${36 / 16}rem;
  margin-left: ${25 / 16}rem;
  text-decoration: none;
  align-items: center;
  display: flex;
  cursor: pointer;
  ${({ theme }) => theme.font.xlarge};
  ${({ theme }) => theme.font.bold};
  & .logo {
    ${({ theme }) => theme.font.logo};
    font-size: 26px;
    letter-spacing: 3px;
  }
  ${media.tablet} {
    margin-right: 20px;
    .logo {
      display: none;
    }
  }
  ${media.mobile} {
    .logo {
      display: block;
      ${({ theme }) => theme.font.large};
    }
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;

const Img = styled(Logo)`
  width: ${36 / 16}rem;
  height: ${36 / 16}rem;
  margin-right: 1rem;
  ${media.tablet} {
    width: 32px;
    height: 32px;
  }
`;

const ProfileWrapper = styled.div`
  height: 40px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  ${media.tablet} {
    .name {
      display: none;
    }
  }
  ${media.mobile} {
    .auth {
      display: none;
    }
    .profile {
      padding-right: 16px;
    }
    margin-left: 0;
  }
`;
export const StListWrapper = styled.nav`
  display: flex;
`;

const MobileMenu = styled.div`
  display: none;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
  width: 100vw;
  height: 240px;
  animation: toggleMenu 0.5s ease forwards;
  position: absolute;
  top: 60px;
  left: 0;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 1;
  @keyframes toggleMenu {
    from {
      top: 56px;
      left: 0;
      opacity: 0.8;
    }
    to {
      top: 60px;
      left: 0;
      opacity: 1;
    }
  }

  ${media.mobile} {
    display: block;
  }
`;
