import { useEffect, useState } from "react";
import { media } from "../../styles/theme";
import styled from "styled-components";
import { ReactComponent as IconDelete } from "../../asset/icon/delete.svg";
import { ReactComponent as IconBasket } from "../../asset/icon/basket.svg";
import { ReactComponent as IconAdd } from "../../asset/icon/add.svg";
import { ReactComponent as IconClose } from "../../asset/icon/close.svg";
import { ReactComponent as IconCloseCircle } from "../../asset/icon/closeCircle.svg";
import { ReactComponent as IconEdit } from "../../asset/icon/edit.svg";
import {
  getShoppinglist,
  postShoppinglist,
  putShoppinglist,
  deleteShoppinglist,
  deleteAllShoppinglist,
} from "../../api/shoppinglist";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/atom";

export const ShopingContent = ({ handleToast, handleTap2 }) => {
  const [edit, setEdit] = useState("");
  const [editValue, setEditValue] = useState("");
  const [add, setAdd] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [shoppintlist, setShoppinglist] = useState([]);

  const login = useRecoilValue(loginState);

  const requestGet = async () => {
    const response = await getShoppinglist();
    if (response && response.status === 200) {
      setShoppinglist(response.data.data);
    }
  };

  const requestPost = async (content, checked) => {
    const response = await postShoppinglist(content, checked);
    if (response.status === 200) {
      return response.data.data;
    } else {
      alert("장보기 리스트 추가를 실패했습니다.");
    }
  };

  const requestPut = async (content, checked, id) => {
    const response = await putShoppinglist(content, checked, id);
    if (response.status === 200) {
      return response.data.data;
    } else {
      alert("장보기 리스트 수정을 실패했습니다.");
    }
  };

  const requestDelete = async (content, checked, id) => {
    const response = await deleteShoppinglist(content, checked, id);
    if (response.status === 200) {
      return response.data.data;
    } else {
      alert("장보기 리스트 삭제를 실패했습니다.");
    }
  };

  const requestDeleteAll = async () => {
    const response = await deleteAllShoppinglist();
    if (response.status === 200) {
      return response;
    }
  };

  const handleAddList = () => {
    login && setAdd(true);
    !login && handleToast();
  };

  const handleAddContent = () => {
    const addContent = async () => {
      await requestPost(addValue, false);
      await requestGet();
    };
    addValue !== "" && addContent() && setAdd(false);
    setAddValue("");
  };

  const handleCheckbox = (content, checked, id) => {
    const changeValue = checked ? false : true;
    const postChangeValue = async () => {
      await requestPut(content, changeValue, id);
      await requestGet();
    };
    postChangeValue();
  };

  const handleEditlist = (content, idx) => {
    setEdit(idx);
    setEditValue(content);
  };

  const handleEditSubmit = (id, checked) => {
    const editContent = async () => {
      await requestPut(editValue, checked, id);
      await requestGet();
    };
    editContent();
    setEdit("");
    setEditValue("");
  };

  const handleDetelelist = async (content, checked, id) => {
    await requestDelete(content, checked, id);
    await requestGet();
  };

  const handleAllDelete = () => {
    const inputValue = window.confirm("재료를 전체 삭제 하시겠습니까?");
    const deleteAll = async () => {
      await requestDeleteAll();
      await requestGet();
    };
    inputValue && deleteAll();
  };

  useEffect(() => {
    login && requestGet();
  }, []);

  return (
    <ShoppingListContent handleTap2={handleTap2}>
      <div className="titleBox">
        <IconBasket className="leftIcon" />
        <h3>장봐야할 재료</h3>
        <IconDelete className="deleteIcon" onClick={login && handleAllDelete} />
      </div>
      <div className="shoppinglistBox">
        {shoppintlist.length > 0 &&
          shoppintlist.map((item, idx) => {
            return (
              <div key={"shoppinglist" + idx} className="listcontent">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {
                    handleCheckbox(item.content, item.checked, item.id);
                  }}
                />
                {String(edit) === String(idx) ? (
                  <form>
                    <textarea
                      className="editInput"
                      type="text"
                      value={editValue}
                      onChange={(e) => {
                        setEditValue(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="editBtn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditSubmit(item.id, item.checked);
                      }}>
                      수정
                    </button>
                  </form>
                ) : (
                  <>
                    <Content checked={item.checked}>{item.content}</Content>
                    <IconEdit
                      className="ShoppingListIcon"
                      onClick={() => {
                        handleEditlist(item.content, idx);
                      }}
                    />
                    <IconClose
                      className="ShoppingListIcon"
                      onClick={() => {
                        handleDetelelist(item.content, item.checked, item.id);
                      }}
                    />
                  </>
                )}
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
  height: 100%;

  .shoppinglistBox {
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

  .listcontent {
    border-bottom: 1px solid ${({ theme }) => theme.color.darkgray};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 24px;

    input {
      margin-right: 16px;
    }

    span {
      width: 100%;
      line-height: 1.3;
    }

    form {
      position: relative;
    }

    .editInput {
      width: 220px;
      height: 60px;
      overflow-y: scroll;
    }
    .editBtn {
      display: inline-block;
      color: #757575;
      font-size: 14px;
      background-color: #f5f5f5;
      margin-left: 12px;
      border-radius: 4px;
      border: 1px solid #757575;
      padding: 4px 10px;
      position: absolute;
      top: 16px;
      right: -68px;
    }
    .addListBtn {
      position: relative;
      padding-left: 2rem;
      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
    }
    .addlistForm {
      width: 320px;
      position: relative;

      .addlistClose {
        position: absolute;
        top: 0;
        right: 2px;
        fill: #757575;
        width: 22px;
        cursor: pointer;
      }
      textarea {
        width: 79%;
        height: 60px;
      }
      button {
        border: 1px solid #757575;
        border-radius: 999px;
        padding: 2px 10px;
        margin-left: 1rem;
        color: #757575;
        background-color: #f5f5f5;
      }
    }
    .ShoppingListAddIcon {
      width: 22px;
      margin-right: 6px;
      &.add {
        position: absolute;
        top: -3px;
        left: 0px;
      }
    }
    .ShoppingListIcon {
      width: 20px;
      cursor: pointer;
      fill: #757575;
      margin-left: 4px;
    }
  }
  ${media.mobile} {
    display: ${(props) => (props.handleTap2 ? "block" : "none")};
    width: 100%;

    .listcontent {
      form {
        width: 100%;
      }
      .editInput {
        width: 80%;
      }
      .editBtn {
        right: -14px;
      }

      .addlistForm {
        width: 100%;
        textarea {
        }
        button {
          margin: 0;
          margin-top: 4px;
          margin-left: 12px;
        }
      }
    }
  }
`;

const Content = styled.span`
  line-height: 1.3;
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  color: ${(props) => (props.checked ? props.theme.color.lightblack : "none")};
`;
