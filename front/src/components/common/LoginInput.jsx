import React from "react";
import styled from "styled-components";
const StyledInput = styled.input`
  outline: none;
  box-sizing: border-box;
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.color.white};
  color: black;
  /* 크기 */
  height: 44px;
  width: 460px; 
  // 327, 40 mobile
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  border-radius: 4px;
  padding-left: 24px;
`;

export const LoginInput = function ({ type, name, placeholder, onChange, value }) {
  return <StyledInput type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} />;
};

export default LoginInput;
