import styled from 'styled-components';

// 필수 props: text, bgcolor, txtcolor
// 선택 props: width, shape('round'), txtstyle('bold')
export const Button = ({ width, text, shape, bgcolor, txtcolor, txtstyle }) => {
  return (
    <StyledButton width={width} shape={shape} bgcolor={bgcolor} txtcolor={txtcolor} txtstyle={txtstyle}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : 'auto')};
  height: 44px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-items: center;
  border: none;
  border-radius: ${(props) => (props.shape ? `999px` : `8%`)};
  background-color: ${(props) => props.theme.color[props.bgcolor]};
  color: ${(props) => props.theme.color[props.txtcolor]};
  ${(props) => props.txtstyle && props.theme.font[props.txtstyle]}
`;
