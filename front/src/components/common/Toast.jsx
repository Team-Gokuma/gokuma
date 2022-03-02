import styled from "styled-components";
import { useEffect } from "react";

export const Toast = ({ isActive, OffToast }) => {
  console.log(isActive);
  useEffect(() => {
    if (isActive)
      setTimeout(() => {
        OffToast();
      }, 3000);
  });
  return <>{isActive && <ToastContainer>로그인이 필요한 기능입니다!</ToastContainer>}</>;
};

const ToastContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid #757575;
  background-color: ${({ theme }) => theme.color.gray};
  color: ${({ theme }) => theme.color.black};
  border-radius: 4px;
  ${({ theme }) => theme.font.xlarge}
  display: inline-block;
  padding: 30px 60px;
  position: absolute;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  animation-fill-mode: forwards;
  animation-name: fadein, fadeout;
  animation-delay: 0s, 2.5s;
  animation-duration: 0.5s, 0.5s;
  animation-timing-function: linear;
  @keyframes fadein {
    from {
      top: -90px;
      opacity: 0;
    }
    to {
      top: -60px;
      opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      top: -60px;
      opacity: 1;
    }
    to {
      top: -90px;
      opacity: 0;
    }
  }
`;
