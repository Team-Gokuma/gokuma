import styled from "styled-components";
import { Button } from "../components/common/Button";

const dummydata = { name: "엘리스", email: "test@test.com" };

const Mypage = () => {
  return (
    <MypageContainer>
      <MypageContent>
        <h2>
          <span>{dummydata.name}</span> 님
        </h2>
        <div className="mypageContent">
          <div>
            <h3>회원정보</h3>
            <p>이메일 : {dummydata.email}</p>
            <p>
              닉네임 : {dummydata.name}
              <span className="editNameBtn">
                <Button text={"수정"} bgcolor={"white"} txtcolor={"orange"} border={"1px solid"} padding={"0 1rem"} />
              </span>
            </p>
            <span className="userInfoBtn">
              <Button text={"비밀번호 변경"} bgcolor={"orange"} txtcolor={"white"} round={true} />
            </span>
            <span>
              <Button text={"회원 탈퇴"} bgcolor={"orange"} txtcolor={"white"} round={true} padding={"0 2rem"} />
            </span>
          </div>
        </div>
      </MypageContent>
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.section`
  width: 100vw;
  height: 90vh;
  background-color: #f0f1f3;
`;
const MypageContent = styled.div`
  width: ${600 / 16}rem;
  margin: 0 auto;
  padding-top: ${80 / 16}rem;

  & h2 {
    ${({ theme }) => theme.font.xlarge};
    margin-bottom: ${40 / 16}rem;
    margin-left: 1rem;

    & span {
      ${({ theme }) => theme.font.bold}
    }
  }
  & .mypageContent {
    width: ${600 / 16}rem;
    height: ${400 / 16}rem;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: ${10 / 16}rem;
    padding: ${60 / 16}rem;
    ${({ theme }) => theme.font.medium};
    box-shadow: 3px 7px 14px 0 rgba(0, 0, 0, 0.05);

    & h3 {
      ${({ theme }) => theme.font.bold};
      ${({ theme }) => theme.font.xlarge};
      padding-bottom: ${40 / 16}rem;
    }
    & p {
      margin-bottom: ${28 / 16}rem;
      width: 70%;
      position: relative;
    }
    & .editNameBtn {
      margin-left: ${60 / 16}rem;
      position: absolute;
      top: -12px;
      right: -40px;
    }
    & .userInfoBtn {
      display: inline-block;
      margin-top: ${40 / 16}rem;
      margin-right: 1.2rem;
    }
  }
`;