import styled from "styled-components";
import { media } from "../../styles/theme";

// 필수 props: text, bgcolor, txtcolor
// 선택 props: width('원하는크기'), height('원하는크기'), round(boolean), txtstyle('bold'), padding('원하는크기')
// <Button text={} bgcolor={} txtcolor={} width={} height={} round={} txtstyle={} padding={} border={} />
export const Button = (props) => {
  return <StyledButton {...props}>{props.text}</StyledButton>;
};

const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "44px")};
  padding: ${(props) => (props.padding ? props.padding : "20px")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: ${(props) => (props.round ? `999px` : `${8 / 16}rem`)};
  background-color: ${(props) => props.theme.color[props.bgcolor]};
  color: ${(props) => props.theme.color[props.txtcolor]};
  ${(props) => props.txtstyle && props.theme.font[props.txtstyle]}
  cursor: ${(props) => (props.cursor ? props.cursor : "pointer")};
  ${media.mobile} {
    height: 40px;
    top: 60px;
  }
`;

export default Button;
