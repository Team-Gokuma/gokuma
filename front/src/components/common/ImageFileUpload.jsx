import { useState } from 'react';
import styled from 'styled-components';

export const ImageFileUpload = ({ width, height }) => {
  const [isFile, setIsFile] = useState(false);
  const [image, setImage] = useState('');

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
    setImage('');
  }

  return (
    <FileUpload width={width}>
      {!isFile && (
        <ImageUpload height={height}>
          <input
            className="file-upload-input"
            type="file"
            onChange={(e) => {
              readURL(e.target.files[0]);
            }}
            value={image}
            accept="image/*"
          />
          <div className="drag-text">
            <p>
              재료 사진을 드래그 해서 올려놓거나, 클릭해서 업로드 해주세요!
              <br />
              자동으로 재료를 빠르고 쉽게 인식해서 추가해드립니다!
            </p>
          </div>
        </ImageUpload>
      )}
      {isFile && (
        <FileUploadContent height={height}>
          {image && <img className="file-upload-image" src={image} alt="uploaded" />}
          <div className="image-title-wrap">
            <button type="button" onClick={removeFile} className="remove-image">
              사진 삭제
            </button>
          </div>
        </FileUploadContent>
      )}
    </FileUpload>
  );
};

const FileUpload = styled.div`
  background-color: #ffffff;
  width: ${(props) => props.width};
  margin: 0 auto;
  padding: 20px;
  & :hover,
  .image-dropping {
    background-color: ${({ theme }) => theme.color.lightgray};
  }
  & .drag-text {
    padding: 160px 0;
  }
`;
const ImageUpload = styled.div`
  height: ${(props) => props.height};
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  position: relative;
  & .file-upload-input {
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
`;
const FileUploadContent = styled.div`
  text-align: center;
  & .image-upload-wrap {
    margin-top: 20px;
    position: relative;
  }
  .image-title-wrap {
    padding: 0 15px 15px 15px;
    color: #222;
  }
  .file-upload-image {
    max-width: ${(props) => props.height};
    max-height: ${(props) => props.height};
    margin: auto;
    padding: 40px;
  }
  .remove-image {
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

  .remove-image:hover {
    background: #c13b2a;
    color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .remove-image:active {
    border: 0;
    transition: all 0.2s ease;
  }
`;
