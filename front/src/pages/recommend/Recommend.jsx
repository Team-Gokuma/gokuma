import styled from "styled-components";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageFileUpload } from "../../components/common/ImageFileUpload";
import { Button } from "../../components/common/Button";
import { ReactComponent as IconClose } from "../../asset/icon/close.svg";

const Recommend = () => {
  const [AddToggle, setAddToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();
  console.log(tags, inputValue);

  const handleToggle = () => {
    setAddToggle(false);
  };

  const saveTags = (e) => {
    e.preventDefault();
    setTags((cur) => {
      const newTags = [...cur, inputValue];
      return newTags;
    });
    setInputValue("");
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

  return (
    <section>
      <RecommendContainer>
        <h2>재료 조합으로 레시피를 추천해드립니다!</h2>
        <p>
          이미지를 업로드 하거나, 원하는 재료를 입력하면
          <br />
          재료 조합으로 만들수 있는 레시피를 찾아드립니다!
        </p>
        <ImageFileUpload width={"600px"} height={"400PX"} />
        <div className="btnContainer">
          <div className="btnGroup">
            {AddToggle ? (
              <div onClick={handleToggle} className="addtag">
                <Button text={"추가하기"} bgcolor={"orange"} txtcolor={"white"} round={true} />
              </div>
            ) : (
              <>
                <div className="tags">{tagList}</div>
                <form onSubmit={saveTags}>
                  <input
                    type={"text"}
                    value={inputValue}
                    placeholder="재료명을 입력해주세요."
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                  />
                </form>
              </>
            )}
          </div>
          <div
            onClick={() => {
              navigate("/result");
            }}>
            <Button className={""} text={"레시피 찾기"} bgcolor={"yellow"} txtcolor={"black"} width={"180px"} />
          </div>
        </div>
      </RecommendContainer>
    </section>
  );
};

export default Recommend;

const RecommendContainer = styled.div`
  width: ${768 / 16}rem;
  margin: 0 auto;
  text-align: center;

  & h2 {
    ${({ theme }) => theme.font.large};
    ${({ theme }) => theme.font.bold};
    margin-top: 60px;
    margin-bottom: 12px;
  }
  & p {
    line-height: 1.5;
  }
  & .btnContainer {
    margin-top: 12px;
  }
  & .btnGroup {
    & .addtag {
      margin-bottom: 32px;
    }
    & .tags {
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
    }
    & .tag {
      margin-right: 8px;
      position: relative;
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
      margin-bottom: 32px;
      & input {
        width: 320px;
        height: 44px;
        padding-left: 24px;
        border-radius: 9999px;
        border: 1px solid ${({ theme }) => theme.color.orange};
      }
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
