import styled from 'styled-components';
import { theme } from 'styled-tools';
import { StListWrapper } from './Header';
import { useNavigate } from "react-router-dom";

export default function CommonNav() {
  const navigate = useNavigate();
  const LOGINNAVS = [
    { id: 0, navText: "레시피 추천받기", navigate: () => navigate("recommend") },
    { id: 1, navText: "나의 냉장고", navigate: () => navigate("refrige") },
    { id: 2, navText: "즐겨찾는 레시피", navigate: () => navigate("bookmark") },
    { id: 3, navText: "장보기 리스트", navigate: () => navigate("shoppinglist") },
  ];

  return (
    <Wrapdiv>
      <StWrapper>
        {LOGINNAVS.map((nav) => (
          <span key={`nav-${nav.id}`} onClick={nav.navigate}>
            {nav.navText}
          </span>
        ))}
      </StWrapper>
    </Wrapdiv>
  );
}
const Wrapdiv = styled.div`
  justify-content: flex-start;
`;
const StWrapper = styled(StListWrapper)`
  display: flex;
  justify-content: space-between;

  width: 32rem;

  & > span {
    ${theme('font.medium')};
    cursor: pointer;
  }
`;
