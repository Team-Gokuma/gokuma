import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as IconRefrige } from "../../asset/icon/refrige.svg";
import { Button } from "../common/Button";
import { useEffect, useState } from "react";

export const RefrigeIngredient = ({ ingredient }) => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    setLogin(window.sessionStorage.getItem("isLogin"));
  }, []);

  return (
    <InRefrigeIngredient>
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
                  txtcolor="lightblack"
                  height="32px"
                  cursor="default"
                  round={true}
                  border="1.9px solid #757575"
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
`;
