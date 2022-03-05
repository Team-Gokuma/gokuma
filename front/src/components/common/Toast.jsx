import styled from "styled-components";
import { useEffect } from "react";
import alert from "../../asset/icon/alert.svg";

export const Toast = ({ isActive, OffToast }) => {
  useEffect(() => {
    if (isActive)
      setTimeout(() => {
        OffToast();
      }, 3000);
  });
  return (
    <>
      {isActive && (
        <ToastContainer>
          <span>
            <img src={alert} alt="alert" />
          </span>
          로그인이 필요한 기능입니다!
        </ToastContainer>
      )}
    </>
  );
};

const ToastContainer = styled.div`
  width: 360px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.orange};
  background-color: #fdf8ed;
  color: ${({ theme }) => theme.color.black};
  ${({ theme }) => theme.font.xlarge}
  display: inline-block;
  padding: 20px 60px;
  line-height: 1;
  position: absolute;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  animation-fill-mode: forwards;
  animation-name: fadein, fadeout;
  animation-delay: 0s, 2.5s;
  animation-duration: 0.5s, 0.5s;
  animation-timing-function: ease;
  z-index: 100;
  @keyframes fadein {
    from {
      top: -120px;
      opacity: 0;
    }
    to {
      top: -70px;
      opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      top: -70px;
      opacity: 1;
    }
    to {
      top: -120px;
      opacity: 0;
    }
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
  span {
    line-height: 1;
  }
`;
