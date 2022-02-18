import styled from "styled-components";

// 필수 props: text, bgcolor, txtcolor
// 선택 props: width('원하는크기'), round(boolean), txtstyle('bold')
export const Button = ({ width, text, round, bgcolor, txtcolor, txtstyle }) => {
  return (
    <StyledButton width={width} round={round} bgcolor={bgcolor} txtcolor={txtcolor} txtstyle={txtstyle}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : "auto")};
  height: 44px;
  padding: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${(props) => (props.round ? `999px` : `8px`)};
  background-color: ${(props) => props.theme.color[props.bgcolor]};
  color: ${(props) => props.theme.color[props.txtcolor]};
  ${(props) => props.txtstyle && props.theme.font[props.txtstyle]}
`;
