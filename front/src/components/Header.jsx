import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CommonNav } from "./";
import { useRecoilState } from "recoil";
import { logout } from "../api/user";
import { loginState } from "../store/atom";
import { ReactComponent as Logo } from "../asset/icon/header/logo.svg";
import { ReactComponent as Profile } from "../asset/icon/profile.svg";
import Button from "../components/common/Button";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const handleLogout = async () => {
    await logout().then((res) => {
      if (res.status === 200) {
        setIsLogin(false);
        navigate("/");
      } else {
        alert("error");
        return res.msg;
      }
    });
  };

  const LOGINNAVS = [
    { id: 0, navText: "레시피 추천받기", navigate: () => navigate("recommend") },
    { id: 1, navText: "고쿠마 냉장고", navigate: () => navigate("refrige") },
    { id: 2, navText: "즐겨찾는 레시피", navigate: () => navigate("bookmark") },
    { id: 3, navText: "장보기 리스트", navigate: () => navigate("shoppinglist") },
  ];

  return (
    <>
      <StWrapper>
        <LogoWrapper onClick={() => navigate("/")}>
          <Img />
          <div>고쿠마 레시피</div>
        </LogoWrapper>
        <CommonNav navList={LOGINNAVS} />
        {isLogin ? (
          <ProfileWrapper>
            <div onClick={handleLogout}>
              <Button width="104px" height="100px" text="Logout" bgcolor="yellow" txtcolor="black" round="round" />
            </div>
            <Link to="/mypage" style={{ textDecoration: "none", color: "black" }}>
              <div style={{ float: "left", marginTop: "14px", marginRight: "10px" }}>엘리스님</div>
              <Profile />
            </Link>
          </ProfileWrapper>
        ) : (
          <ProfileWrapper>
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              <Button text="Login / Sign up" bgcolor="yellow" txtcolor="black" round="round" />
            </Link>
            <Link to="/mypage">
              <Profile />
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
