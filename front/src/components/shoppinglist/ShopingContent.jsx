import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as IconDelete } from "../../asset/icon/delete.svg";
import { ReactComponent as IconBasket } from "../../asset/icon/basket.svg";
import { ReactComponent as IconAdd } from "../../asset/icon/add.svg";
import { ReactComponent as IconClose } from "../../asset/icon/close.svg";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";
import { ReactComponent as IconEdit } from "../../asset/icon/edit.svg";

export const ShopingContent = () => {
  const [edit, setEdit] = useState("");
  const [editValue, setEditValue] = useState("");
  const [add, setAdd] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [shoppintlist, setShoppinglist] = useState([
    "이마트에 가서 필요한거 둘러보고 사오기 (꼭 사와야할 물건은 사와야함)",
    "장보기",
  ]);

  function handleDetelelist(idx) {
    setShoppinglist((cur) => {
      const newArr = [...cur];
      newArr.splice(idx, 1);
      return newArr;
    });
  }

  function handleEditlist(item, idx) {
    setEdit(idx);
    setEditValue(item);
  }

  function handleEditSubmit(idx) {
    setShoppinglist((cur) => {
      const newArr = [...cur];
      newArr[idx] = editValue;
      return newArr;
    });
    setEdit("");
    setEditValue("");
  }

  function handleAddList() {
    setAdd(true);
  }

  function handleAddContent() {
    addValue !== "" &&
      setShoppinglist((cur) => {
        const newArr = [...cur];
        newArr.push(addValue);
        return newArr;
      });
    addValue !== "" && setAdd(false);
    setAddValue("");
  }

  return (
    <ShoppingListContent>
      <div className="titleBox">
        <IconBasket className="leftIcon" />
        <h3>장봐야할 재료</h3>
        <IconDelete className="deleteIcon" />
      </div>
      <div>
        {shoppintlist.length > 0 &&
          shoppintlist.map((item, idx) => {
            return (
              <div key={"shoppinglist" + idx} className="listcontent">
                <input type={"checkbox"} value={idx} />
                {String(edit) === String(idx) ? (
                  <form>
                    <textarea
                      className="editInput"
                      type={"text"}
                      value={editValue}
                      onChange={(e) => {
                        setEditValue(e.target.value);
                      }}
                    />
                  </form>
                ) : (
                  <span>{item}</span>
                )}
                {String(edit) === String(idx) ? (
                  <button
                    type="submit"
                    className="editBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditSubmit(idx);
                    }}>
                    수정
                  </button>
                ) : (
                  <IconEdit
                    className="ShoppingListIcon"
                    onClick={() => {
                      handleEditlist(item, idx);
                    }}
                  />
                )}
                <IconClose
                  className="ShoppingListIcon"
                  onClick={() => {
                    handleDetelelist(idx);
                  }}
                />
              </div>
            );
          })}
        <div className="listcontent addlist">
          {add ? (
            <form
              className="addlistForm"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddContent();
              }}>
              <textarea
                value={addValue}
                onChange={(e) => {
                  setAddValue(e.target.value);
                }}
              />
              <button type="submit" className="addlistBtn">
                추가
              </button>
              <IconCloseCircle
                className="addlistClose"
                onClick={() => {
                  setAdd(false);
                }}
              />
            </form>
          ) : (
            <>
              <span className="addListBtn" onClick={handleAddList}>
                <IconAdd className="ShoppingListAddIcon add" />
                추가하기
              </span>
            </>
          )}
        </div>
      </div>
    </ShoppingListContent>
  );
};
const ShoppingListContent = styled.div`
  width: 50%;

  & .listcontent {
    border-bottom: 1px solid ${({ theme }) => theme.color.darkgray};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem ${24 / 16}rem;

    & input {
      margin-right: 1rem;
    }

    & span {
      width: 100%;
      line-height: 1.3;
    }
    & .editInput {
      width: 240px;
      height: 60px;
      overflow-y: scroll;
    }
    & .editBtn {
      display: inline-block;
      color: #757575;
      font-size: 14px;
      background-color: #f5f5f5;
      margin-left: 12px;
      border-radius: 4px;
      border: 1px solid #757575;
      padding: 4px 10px;
    }
    & .addListBtn {
      position: relative;
      padding-left: 2rem;
      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
    }
    & .addlistForm {
      width: ${320 / 16}rem;
      position: relative;

      & .addlistClose {
        position: absolute;
        top: 0;
        right: 2px;
        fill: #757575;
        width: 22px;
        cursor: pointer;
      }
      & textarea {
        width: 79%;
        height: 60px;
      }
      & button {
        border: 1px solid #757575;
        border-radius: 999px;
        padding: 2px 10px;
        margin-left: 1rem;
        color: #757575;
        background-color: #f5f5f5;
      }
    }
    & .ShoppingListAddIcon {
      width: 1.4rem;
      margin-right: 0.4rem;
      &.add {
        position: absolute;
        top: -3px;
        left: 0px;
      }
    }
    & .ShoppingListIcon {
      width: 1.3rem;
      cursor: pointer;
      fill: #757575;
      margin-left: 4px;
    }
  }
`;
