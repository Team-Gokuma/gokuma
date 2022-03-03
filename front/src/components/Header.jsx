import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CommonNav } from "./";
import { useSetRecoilState } from "recoil";
import { logout } from "../api/user";
import { mainRecipesState, relatedRecipesState } from "../store/atom";
import { ReactComponent as Logo } from "../asset/icon/header/logo.svg";
import { ReactComponent as Profile } from "../asset/icon/profile.svg";
import menu from "../asset/icon/mobile/menu.svg";
import Button from "../components/common/Button";
import { media } from "../styles/theme";
import { StyledLink } from "../styles/commonStyle";

const Header = () => {
  const navigate = useNavigate();
  const isLogin = window.sessionStorage.getItem("isLogin");
  const mainRecipes = useSetRecoilState(mainRecipesState);
  const relatedRecipes = useSetRecoilState(relatedRecipesState);
  const handleLogout = async () => {
    await logout().then((res) => {
      if (res.status !== 404) {
        window.sessionStorage.clear();
        mainRecipes([]);
        relatedRecipes([]);
        setIsLogin(false);
        navigate("/");
      } else {
        alert("error");
        return res.msg;
      }
    });
  };

  const name = window.sessionStorage.getItem("name");

  //   function getCookie(key) {
  //     var result = null;
  //     var cookie = document.cookie.split(';');
  //     cookie.some(function (item) {
  //         // 공백을 제거
  //         item = item.replace(' ', '');

  //         var dic = item.split('=');

  //         if (key === dic[0]) {
  //             result = dic[1];
  //             return true;    // break;
  //         }
  //     });
  //     return result;
  // }
  // var setCookie = function(name, value, exp) {
  //   var date = new Date();
  //   date.setTime(date.getTime() + exp*24*60*60*1000);
  //   document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  // };
  // var deleteCookie = function(name) {
  //   document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  //   }

  // setCookie("name", "wkdgns", 1);
  //   const name = getCookie("name");
  //   console.log(name);
  return (
    <>
      <StWrapper>
        <div className="mobileMenu">
          <img src={menu} alt="mobile menu" />
        </div>
        <LogoWrapper onClick={() => navigate("/")}>
          <Img />
          <div className="logo">어쩔냉장고</div>
        </LogoWrapper>
        <div className="nav">
          <CommonNav />
        </div>
        <ProfileWrapper>
          {isLogin ? (
            <>
              <div className="auth" onClick={handleLogout}>
                <Button width="104px" height="45px" text="Logout" bgcolor="yellow" txtcolor="black" round="round" />
              </div>
              <StyledLink to="/mypage">
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
              <StyledLink to="/login">
                <Profile />
              </StyledLink>
            </>
          )}
        </ProfileWrapper>
      </StWrapper>
      <MobileMenu>
        <CommonNav />
      </MobileMenu>
    </>
  );
};
export default Header;

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
    flex-direction: column;
    margin-right: 20px;
    .logo {
      display: none;
    }
  }
`;

const StWrapper = styled.header`
  display: flex;
  align-items: center;
  padding-right: ${36 / 16}rem;
  /* width: 100%; */
  height: 5rem;
  background: ${({ theme }) => theme.color.yellow};
  & > span,
  svg {
    cursor: pointer;
  }
  ${media.tablet} {
    height: 60px;
  }
  ${media.mobile} {
    height: 60px;
  }
  nav {
    ${media.mobile} {
      display: none;
    }
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
  }
`;
export const StListWrapper = styled.nav`
  display: flex;
`;

const MobileMenu = styled.div`
  border: 1px solid;
  display: none;
  ${media.mobile} {
    display: block;
    width: 100vw;
    height: 240px;
  }
`;
