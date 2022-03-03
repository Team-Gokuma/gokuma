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

  const LOGINNAVS = [
    { id: 0, navText: "레시피 추천받기", navigate: () => navigate("recommend") },
    { id: 1, navText: "나의 냉장고", navigate: () => navigate("refrige") },
    { id: 2, navText: "즐겨찾는 레시피", navigate: () => navigate("bookmark") },
    { id: 3, navText: "장보기 리스트", navigate: () => navigate("shoppinglist") },
  ];

  return (
    <>
      <StWrapper>
        <LogoWrapper onClick={() => navigate("/")}>
          <Img />
          <div className="logo">어쩔냉장고</div>
        </LogoWrapper>
        <CommonNav navList={LOGINNAVS} />
        {isLogin ? (
          <ProfileWrapper>
            <div onClick={handleLogout} style={{ marginBottom: "15px" }}>
              <Button width="104px" height="45px" text="Logout" bgcolor="yellow" txtcolor="black" round="round" />
            </div>
            <Link to="/mypage" style={{ textDecoration: "none", color: "black" }}>
              <div style={{ float: "left", marginTop: "14px", marginRight: "10px" }}>{name}님</div>
              <Profile />
            </Link>
          </ProfileWrapper>
        ) : (
          <ProfileWrapper>
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              <Button text="Login / Sign up" bgcolor="yellow" txtcolor="black" round="round" />
            </Link>
          </ProfileWrapper>
        )}
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
