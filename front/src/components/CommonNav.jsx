import styled from "styled-components";
import { StListWrapper } from "./Header";

export default function CommonNav({ navList }) {
  return (
    <Wrapdiv>
    <StWrapper>
      {navList.map((nav) => (
        <span key={`nav-${nav.id}`} onClick={nav.navigate}>
          {nav.navText}
        </span>
      ))}
    </StWrapper>
    </Wrapdiv>
  );
}
const Wrapdiv = styled.div`
  justify-content: flex-end;
`;
const StWrapper = styled(StListWrapper)`
  display : flex;
  justify-content: space-between;

  width: 30rem;

  & > span {
    cursor: pointer;
  }
`;
