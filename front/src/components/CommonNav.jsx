import styled from "styled-components";
import { StListWrapper } from "./Header";
import { useNavigate } from "react-router-dom";
import { media } from "../styles/theme";

export default function CommonNav({ mobileMenuToggle }) {
  const navigate = useNavigate();
  const LOGINNAVS = [
    { id: 0, navText: "레시피 추천받기", navigate: () => navigate("recommend") },
    { id: 1, navText: "나의 냉장고", navigate: () => navigate("refrige") },
    { id: 2, navText: "즐겨찾는 레시피", navigate: () => navigate("bookmark") },
    { id: 3, navText: "장보기 리스트", navigate: () => navigate("shoppinglist") },
    { id: 4, navText: "팀 소개", navigate: () => navigate("teamIntro") },
  ];

  return (
    <Wrapdiv>
      <StWrapper>
        {LOGINNAVS.map((nav) => (
          <span
            key={`nav-${nav.id}`}
            onClick={() => {
              nav.navigate();
              mobileMenuToggle && mobileMenuToggle();
            }}>
            {nav.navText}
          </span>
        ))}
      </StWrapper>
    </Wrapdiv>
  );
}
const Wrapdiv = styled.div`
  justify-content: flex-start;

  ${media.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
`;
const StWrapper = styled(StListWrapper)`
  display: flex;
  justify-content: space-between;
  width: 550px;
  ${media.tablet} {
    width: 480px;
  }
  ${media.mobile} {
    width: 130px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;

    span {
      display: inline-block;
      text-align: center;
      margin: 8px 0;
      padding: 8px;
    }
  }

  span {
    ${({ theme }) => theme.font.medium};
    cursor: pointer;

    ${media.tablet} {
      font-size: 16px;
    }
  }
`;
