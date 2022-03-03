import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CommonNav } from "./";
import { useSetRecoilState } from "recoil";
import { logout } from "../api/user";
import { mainRecipesState, relatedRecipesState } from "../store/atom";
import { ReactComponent as Logo } from "../asset/icon/header/logo.svg";
import { ReactComponent as Profile } from "../asset/icon/profile.svg";
import Button from "../components/common/Button";

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
        // setIsLogin(false);
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
        <LogoWrapper onClick={() => navigate("/")}>
          <Img />
          <div className="logo">어쩔냉장고</div>
        </LogoWrapper>
        <CommonNav/>
        <ProfileWrapper>
        {isLogin ? (
          <>
            <div onClick={handleLogout} style={{ marginBottom: "15px" }}>
              <Button width="104px" height="45px" text="Logout" bgcolor="yellow" txtcolor="black" round="round" />
            </div>
            <Link to="/mypage" style={{ textDecoration: "none", color: "black" }}>
              <div style={{ float: "left", marginTop: "14px", marginRight: "10px" }}>{name}님</div>
              <Profile />
            </Link>
            </>
        ) : (
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              <Button text="Login / Sign up" bgcolor="yellow" txtcolor="black" round="round" />
            </Link>
        )}
        </ProfileWrapper>
      </StWrapper>
    </>
  );
};
export default Header;

const LogoWrapper = styled.h1`
  margin-right: ${50 / 16}rem;
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
`;

const StWrapper = styled.header`
  display: flex;
  align-items: center;
  padding-right: ${36 / 16}rem;
  width: 100%;
  height: 5rem;
  background: ${({ theme }) => theme.color.yellow};
  & > span,
  svg {
    cursor: pointer;
  }
`;

const Img = styled(Logo)`
  width: ${36 / 16}rem;
  height: ${36 / 16}rem;
  margin-right: 1rem;
`;

const ProfileWrapper = styled.div`
  width: 300px;
  height: 40px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
`;
export const StListWrapper = styled.nav`
  display: flex;
`;
