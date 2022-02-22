import styled from "styled-components";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, modalState } from "../../store/atom";
import { ImageFileUpload } from "../common/ImageFileUpload";
import { Button } from "../common/Button";
import { ReactComponent as IconClose } from "../../asset/icon/close.svg";
import { ReactComponent as IconInfo } from "../../asset/icon/info.svg";
import { AlertLoginModal } from "../common/AlertLoginModal";

const regTag = /^[가-힣]+$/;

export const Recommend = ({ page }) => {
  const [AddToggle, setAddToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [msg, setMsg] = useState("");
  const [onIcon, setOnIcon] = useState(false);
  const [tags, setTags] = useState([]);

  const onModal = useRecoilValue(modalState);
  const setOnModal = useSetRecoilState(modalState);
  // const login = useRecoilValue(loginState);
  const login = false;

  // console.log(tags, inputValue);

  const handleToggle = () => {
    setAddToggle(false);
  };

  const saveTags = (e) => {
    e.preventDefault();
    if (regTag.test(inputValue)) {
      setTags((cur) => {
        const newTags = [...cur, inputValue];
        return newTags;
      });
      setInputValue("");
      setMsg("");
      setOnIcon(false);
    }
    if (inputValue !== "" && !regTag.test(inputValue)) {
      setOnIcon(true);
      setMsg("오타 혹은 한글 외에 다른 글자가 포함되어 있습니다!");
    }
  };

  const tagList = useMemo(() => {
    if (!tags.length) setAddToggle(true);
    if (tags.length > 0) {
      return tags.map((item, idx) => {
        const removeTag = () => {
          setTags((cur) => {
            const newTags = [...cur];
            const rmvIdx = newTags.indexOf(item);
            newTags.splice(rmvIdx, 1);
            return newTags;
          });
        };
        return (
          <div className="tag" key={idx}>
            <Button text={item} bgcolor={"orange"} txtcolor={"white"} round={true} padding={"0 40px 0 20px"} />
            <IconClose className="closeIcon" onClick={removeTag} />
          </div>
        );
      });
    }
  }, [tags]);

  const handleClick = () => {
    page && !login && setOnModal(true);
  };

  return (
    <section>
      <RecommendContainer>
        {page ? (
          <>
            <h2>재료 조합으로 레시피를 추천해드립니다!</h2>
            <p>
              이미지를 업로드 하거나, 원하는 재료를 입력하면
              <br />
              재료 조합으로 만들수 있는 레시피를 찾아드립니다!
            </p>
          </>
        ) : (
          <h2>사진으로 추가하기</h2>
        )}
        <ImageFileUpload width={"600px"} height={"400PX"} />
        <div className="btnContainer">
          <div className="btnGroup">
            {AddToggle ? (
              <span onClick={handleToggle} className="addtag">
                <Button text={"추가하기"} bgcolor={"orange"} txtcolor={"white"} round={true} />
              </span>
            ) : (
              <>
                <div className="tags">{tagList}</div>
                <form onSubmit={saveTags}>
                  <input
                    type={"text"}
                    value={inputValue}
                    placeholder="한글로 재료명을 입력해주세요."
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                  />
                </form>
                <p>
                  {onIcon && <IconInfo className="infoIcon" />}
                  {msg}
                </p>
              </>
            )}
          </div>
          {page ? (
            <Link to={login && "/result"} style={{ textDecoration: "none" }} onClick={handleClick}>
              <Button text={"레시피 찾기"} bgcolor={"yellow"} txtcolor={"black"} width={"180px"} />
            </Link>
          ) : (
            <span style={{ textDecoration: "none" }} onClick={handleClick}>
              <Button text={"식재료 추가하기"} bgcolor={"yellow"} txtcolor={"black"} width={"180px"} />
            </span>
          )}
        </div>
      </RecommendContainer>
      {onModal && (
        <AlertLoginModal page={"/result"} text={"로그인하고 냉장고에 추가 하시겠습니까?"} btnText={"바로 추천받기"} />
      )}
    </section>
  );
};

const RecommendContainer = styled.div`
  width: ${740 / 16}rem;
  border: 1px solid ${({ theme }) => theme.color.white};
  padding: 60px;
  margin: 0 auto;
  text-align: center;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.white};

  & h2 {
    ${({ theme }) => theme.font.large};
    ${({ theme }) => theme.font.bold};
    margin-bottom: 12px;
  }
  & p {
    line-height: 1.5;
  }
  & .btnContainer {
  }
  & .btnGroup {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & .addtag {
      display: inline-block;
      margin-bottom: 32px;
    }
    & .tags {
      width: 80%;
      margin-bottom: 20px;
      display: flex;
      /* justify-content: center; */
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    & .tag {
      margin-right: 8px;
      position: relative;
      margin-bottom: 8px;
      & .closeIcon {
        fill: ${({ theme }) => theme.color.white};
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
    & form {
      width: 100%;
      & input {
        width: 320px;
        height: 44px;
        padding-left: 24px;
        border-radius: 9999px;
        border: 1px solid ${({ theme }) => theme.color.orange};
        margin-bottom: 20px;
      }
    }
    & .infoIcon {
      width: ${18 / 16}rem;
      height: ${18 / 16}rem;
      position: absolute;
      top: 2px;
      left: -24px;
      fill: #d23236;
    }
    & p {
      margin-bottom: 32px;
      font-size: ${15 / 16}rem;
      position: relative;
      color: #d23236;
    }
  }
`;

// To DO : 추가하기 버튼에 + 아이콘 추가
// const Img = styled(IconAdd)`
//   width: ${({ theme }) => theme.calcRem(24)};
//   height: ${({ theme }) => theme.calcRem(24)};
//   fill: ${({ theme }) => theme.color.white};
//   position: absolute;
//   top: 10px;
//   left: 324px;
// `;