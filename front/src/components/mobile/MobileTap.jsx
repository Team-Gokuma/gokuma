import styled from "styled-components";
import { media } from "../../styles/theme";

export const MobileTap = ({ onTap1, onTap2, handleTap }) => {
  return (
    <TapContainer>
      <Tap onTap={onTap1} onClick={handleTap}>
        냉장고에 있는 재료
      </Tap>
      <Tap onTap={onTap2} onClick={handleTap}>
        장봐야할 재료
      </Tap>
    </TapContainer>
  );
};

const TapContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-evenly;
  font-size: 16px;
  margin-top: 12px;
  display: none;
  ${media.mobile} {
    display: flex;
  }
`;
const Tap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${(props) => props.onTap && "4px solid" + props.theme.color.orange};
`;
