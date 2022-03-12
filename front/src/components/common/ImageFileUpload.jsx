import { useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/theme";
import { ingredientState } from "../../store/atom";
import { useRecoilValue } from "recoil";

export const ImageFileUpload = ({ width, height, requestRecognition, setIngredient }) => {
  const [isFile, setIsFile] = useState(false);
  const [image, setImage] = useState("");

  const ingredient = useRecoilValue(ingredientState);

  function readURL(fileBlob) {
    setIsFile(true);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  }

  function removeFile() {
    setIsFile(false);
    setImage("");
    setIngredient({
      loading: false,
      error: undefined,
      data: [],
    });
  }

  return (
    <FileUpload width={width}>
      {!isFile && (
        <ImageUpload height={height}>
          <input
            className="fileUploadInput"
            type="file"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              readURL(e.target.files[0]).then(() => requestRecognition(formData));
            }}
            value={image}
            accept="image/*"
          />
          <span className="dragText">
            재료 사진을 드래그 해서 올려놓거나, 클릭해서 업로드 해주세요!
            <br />
            자동으로 재료를 빠르고 쉽게 인식해서 추가해드립니다!
          </span>
        </ImageUpload>
      )}
      {isFile && (
        <FileUploadContent height={height}>
          {image && <img className="fileUploadImage" src={image} alt="uploaded" />}
          <div className="imageTitleWrap">
            <button type="button" onClick={removeFile} className="removeImageBtn">
              사진 삭제
            </button>
          </div>
        </FileUploadContent>
      )}
      {ingredient.loading ? <LoadingMsg>재료를 인식하는중...</LoadingMsg> : undefined}
    </FileUpload>
  );
};

const FileUpload = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  width: ${(props) => props.width};
  margin: 0 auto;
  padding: 20px;
  & :hover {
    background-color: ${({ theme }) => theme.color.lightgray};
  }
  .dragText {
    display: inline-block;
    padding: 160px 0;
  }

  ${media.mobile} {
    width: 100%;

    .dragText {
      padding: 20% 24%;
      word-break: keep-all;
      text-align: left;
      line-height: 1.5;
    }
  }
`;
const ImageUpload = styled.div`
  height: ${(props) => props.height};
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  position: relative;
  .fileUploadInput {
    position: absolute;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
    border: 2px solid orange;
  }
  ${media.mobile} {
    height: 320px;
  }
`;
const FileUploadContent = styled.div`
  text-align: center;
  .imageTitleWrap {
    padding: 0 15px 15px 15px;
    color: #222;
  }
  .fileUploadImage {
    max-width: ${(props) => props.height};
    max-height: ${(props) => props.height};
    margin: auto;
    padding: 40px;
  }
  .removeImageBtn {
    width: 200px;
    margin: 0;
    color: #fff;
    background: #cd4535;
    border: none;
    padding: 10px;
    border-radius: 4px;
    border-bottom: 4px solid #b02818;
    transition: all 0.2s ease;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;
  }

  .removeImageBtn:hover {
    background: #c13b2a;
    color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .removeImageBtn:active {
    border: 0;
    transition: all 0.2s ease;
  }
  ${media.mobile} {
    .removeImageBtn {
      width: 120px;
      height: 44px;
    }
  }
`;

const LoadingMsg = styled.div`
  margin-top: 8px;
`;
