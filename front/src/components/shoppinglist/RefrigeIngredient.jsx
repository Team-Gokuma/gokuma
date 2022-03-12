import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "../../styles/theme";
import { ReactComponent as IconRefrige } from "../../asset/icon/refrige.svg";
import { Button } from "../common/Button";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/atom";

const categoryColor = ["#DD95A1", "#FFC750", "#F7941E", "#79B3DA", "#8CC1AC", "#7E77AD", "#587297"];

export const RefrigeIngredient = ({ ingredient, handleTap1 }) => {
  const login = useRecoilValue(loginState);

  return (
    <InRefrigeIngredient handleTap1={handleTap1}>
      <div className="titleBox">
        <IconRefrige className="leftIcon" />
        <h3>냉장고에 있는 재료</h3>
      </div>

      <div className="refrigeContent">
        {(!login || ingredient.length === 0) && (
          <Link to="/recommend" className="noIngredient">
            재료를 저장하고, 냉장고의 재료를 최대한 이용한 레시피를 추천받을 수 있습니다!
            <br />
            <br />
            추천 받으러 가기 ->
          </Link>
        )}
        {login &&
          ingredient.length > 0 &&
          ingredient.map((item) => {
            return (
              <span key={item.id} className="tag">
                <Button
                  text={item.content}
                  bgcolor="white"
                  txtcolor="black"
                  height="32px"
                  cursor="default"
                  round={true}
                  border={`1.9px solid ${categoryColor[item.category - 1]}`}
                  padding="16px 16px"
                />
              </span>
            );
          })}
      </div>
    </InRefrigeIngredient>
  );
};

const InRefrigeIngredient = styled.div`
  width: 50%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.color.darkgray};
  .refrigeContent {
    padding: 12px;
    height: 88.55%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.gray};
      opacity: 0.4;
      border-radius: 30px;
    }
  }
  .tag {
    display: inline-block;
    margin: 12px 4px 0 4px;
  }
  .noIngredient {
    color: ${({ theme }) => theme.color.black};
    display: inline-block;
    margin: 3.5rem;
    line-height: 1.5;
    border-bottom-left-radius: 999rem;
  }
  ${media.mobile} {
    display: ${(props) => (props.handleTap1 ? "block" : "none")};
    width: 100%;
    .refrigeContent {
      padding: 0;
    }
    .noIngredient {
      word-break: keep-all;
    }
  }
`;
