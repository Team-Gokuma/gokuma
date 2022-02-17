import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import { CommonNav } from './';
import { useRecoilState } from 'recoil';
import { logout } from '../api/user';
import { loginState } from '../store/atom';

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  // setIsLogin(true);
  const navigateor = useNavigate();
  const handleLogout = async () => {
    await logout().then((res) => {
      if (res.status === 200) {
        setIsLogin(false);
        navigateor('/');
      }
    });
  };

  const LOGINNAVS = [
    { id: 0, navText: '레시피 추천받기', navigate: () => navigate('recommend') },
    { id: 1, navText: '고쿠마 냉장고', navigate: () => navigate('refrige') },
    { id: 2, navText: '팀 소개', navigate: () => navigate('teamIntro') },
    { id: 3, navText: '로그인', navigate: () => navigate('login') },
  ];

  const LOGOUTNAVS = [
    { id: 0, navText: '레시피 추천받기', navigate: () => navigate('recommend') },
    { id: 1, navText: '고쿠마 냉장고', navigate: () => navigate('refrige') },
    { id: 2, navText: '팀 소개', navigate: () => navigate('teamIntro') },
    { id: 3, navText: '마이페이지', navigate: () => navigate('mypage') },
    { id: 4, navText: '로그아웃', navigate: () => handleLogout() },
  ];

  return (
    <>
      <StWrapper>
        <LogoWrapper onClick={() => navigate('/')}>
          <Img src={`${process.env.PUBLIC_URL}/img/icon/header/logo.svg`} alt="Logo" />
          <div>고쿠마 레시피</div>
        </LogoWrapper>
        {isLogin === true ? <CommonNav navList={LOGINNAVS} /> : <CommonNav navList={LOGOUTNAVS} />}
      </StWrapper>
    </>
  );
};
export default Header;

const LogoWrapper = styled.h1`
  margin-left: ${24 / 16}rem;
  text-decoration: none;
  align-items: center;
  display: flex;
  cursor: pointer;
  ${theme('font.xlarge')};
  ${theme('font.bold')};
`;

const StWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: ${36 / 16}rem;
  width: 100%;
  height: 5rem;
  background: ${theme('color.yellow')};
  & > span,
  svg {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: ${36 / 16}rem;
  height: ${36 / 16}rem;
  margin-right: 1rem;
`;

export const StListWrapper = styled.nav`
  display: flex;
`;
