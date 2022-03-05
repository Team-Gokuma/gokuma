import styled from "styled-components";
import { media } from "../../styles/theme";

export const MobileTitle = ({ text }) => {
  return (
    <MobileTitleDiv>
      <h2>{text}</h2>
    </MobileTitleDiv>
  );
};

const MobileTitleDiv = styled.div`
  display: none;
  height: 48px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);

  h2 {
    ${({ theme }) => theme.font.medium};
    ${({ theme }) => theme.font.bold};
    padding: 16px 20px;
  }
  ${media.mobile} {
    display: block;
  }
`;
