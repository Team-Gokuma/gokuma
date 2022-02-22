import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Recipe } from "../components/common/Recipe";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, modalState } from "../store/atom";
import { AlertLoginModal } from "../components/common/AlertLoginModal";
import { Button } from "../components/common/Button";

const dummydata = [
  { name: "달걀볶음밥", favorite: true },
  { name: "고쿠마덮밥", favorite: false },
  { name: "치킨", favorite: false },
  { name: "피자", favorite: true },
  { name: "달걀후라이", favorite: true },
  { name: "짜장면", favorite: true },
  { name: "달걀후라이", favorite: false },
  { name: "달걀후라이", favorite: false },
  { name: "달걀후라이", favorite: false },
  { name: "달걀후라이", favorite: false },
  { name: "달걀후라이", favorite: false },
  { name: "달걀후라이", favorite: false },
  { name: "달걀후라이", favorite: false },
  { name: "달걀후라이", favorite: false },
];

const Bookmark = () => {
  const onModal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);
  // const login = useRecoilValue(loginState);
  const login = true;

  useEffect(() => {
    !login && setModal(true);
  }, []);

  return (
    <section>
      {onModal && <AlertLoginModal page={"/bookmark"} text={"로그인이 필요한 기능입니다!"} btnText={"확인"} />}
      <BookmarkContainer>
        <h3>즐겨찾는 레시피</h3>
        <div className="bookmarkList">
          {dummydata.length > 0 ? (
            dummydata.map((item, idx) => {
              return (
                <Recipe
                  key={"recipe" + idx}
                  className="recipe"
                  width={`${240 / 16}rem`}
                  height={`${240 / 16}rem`}
                  text={item.name}
                  margin={"1rem 1.8rem"}
                  favorite={item.favorite}
                  recipeId={idx} // TO DO: API 연결할때 변경
                />
              );
            })
          ) : (
            <div className="noBookmark">
              마음에드는 레시피를 즐겨찾기에 추가해서
              <br /> 나만의 레시피북을 만들어 보세요!
              <br />
              <Link to="/recommend" style={{ textDecoration: "none" }} className="goRecommend">
                <Button text={"레시피 추천 받기 ->"} bgcolor={"orange"} txtcolor={"white"} round={true} />
              </Link>
            </div>
          )}
        </div>
      </BookmarkContainer>
    </section>
  );
};

export default Bookmark;

const BookmarkContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;
  /* border: 1px solid red; */
  & h3 {
    ${({ theme }) => theme.font.xlarge};
    ${({ theme }) => theme.font.bold};
    margin-bottom: ${48 / 16}rem;
    margin-left: 1.8rem;
  }
  & .bookmarkList {
    line-height: 1.5;
  }
  & .noBookmark {
    margin-top: 5rem;
    margin-left: 4rem;
    ${({ theme }) => theme.font.large};

    & .goRecommend {
      display: inline-block;
      animation: motion 1.4s linear 0s infinite;

      @keyframes motion {
            0% {margin-top: 20px;}
            20% {margin-top: 30px;}
            40% {margin-top: 20px;}
            60% {margin-top: 30px;}
            80% {margin-top: 20px;}
            100% {margin-top: 20px;}
        }
      }
      & :hover {
        opacity: 0.8;
      }
    }
  }
`;