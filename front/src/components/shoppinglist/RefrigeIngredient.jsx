import styled from "styled-components";
import { ReactComponent as IconRefrige } from "../../asset/icon/refrige.svg";
import { Button } from "../common/Button";

export const RefrigeIngredient = ({ ingredient }) => {
  return (
    <InRefrigeIngredient>
      <div className="titleBox">
        <IconRefrige className="leftIcon" />
        <h3>냉장고에 있는 재료</h3>
      </div>
      <div className="refrigeContent">
        {ingredient.map((item, idx) => {
          return (
            <span key={item.name + idx} className="tag">
              <Button
                text={item.name}
                bgcolor={"white"}
                txtcolor={"lightblack"}
                height={"32px"}
                cursor={"default"}
                round={true}
                border={"1.9px solid #757575"}
                padding={"16px 16px"}
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
  border-right: 1px solid ${({ theme }) => theme.color.darkgray};
  & .refrigeContent {
    padding: 12px;
  }
  & .tag {
    display: inline-block;
    margin: 12px 4px 0 4px;
  }
`;
