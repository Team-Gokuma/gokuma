import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/common/Button";
import { UpdateNameModal } from "../components/mypage/UpdateNameModal";
import { UpdatePassModal } from "../components/mypage/UpdatePassModal";
import { userdelete, logout, islogin } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { mainRecipesState, rankRecipesState } from "../store/atom";
import { media } from "../styles/theme";

const Mypage = () => {
  const [UpdateName, setUpdateName] = useState(false);
  const [UpdatePass, setUpdatePass] = useState(false);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");

  const mainRecipes = useSetRecoilState(mainRecipesState);
  const rankRecipes = useSetRecoilState(rankRecipesState);
  const navigate = useNavigate();

  const handleCloseName = () => {
    setUpdateName(false);
  };
  const handleClosePass = () => {
    setUpdatePass(false);
  };
  const handleUserDelete = (e) => {
    e.preventDefault();
    const body = { email: useremail };
    requestDelete(body);
  };

  const requestDelete = async (body) => {
    await userdelete(body).then((res) => {
      if (res && res.status === 200) {
        mainRecipes([]);
        rankRecipes([]);
        setUsername("");
        setUseremail("");
        navigate("/");
      } else if (res && res.status !== 200) {
        alert(res.msg);
      }
    });
  };

  const handleLogout = async () => {
    await logout().then((res) => {
      if (res.status === 200) {
        mainRecipes([]);
        rankRecipes([]);
        // setIsLogin(false);
        navigate("/");
      } else {
        alert("error");
        return res.msg;
      }
    });
  };

  const handleIsLogin = async () => {
    await islogin().then((res) => {
      if (res.status === 200) {
        setUsername(res.name);
        setUseremail(res.email);
      } else if (res.status === 404) {
        alert(res.msg);
      }
    });
  };
  useEffect(() => {
    handleIsLogin();
  });

  return (
    <MypageContainer>
      {UpdateName && <UpdateNameModal handleCloseName={handleCloseName} />}
      {UpdatePass && <UpdatePassModal handleClosePass={handleClosePass} />}
      <MypageContent>
        <h2>
          <span>{username}</span> 님
          <LogoutBtn onClick={handleLogout}>
            <Link to="/" className="logout">
              Logout
            </Link>
          </LogoutBtn>
        </h2>
        <UserInfoBox>
          <div>
            <h3>회원정보</h3>
            <p>이메일 : {useremail}</p>
            <p>
              닉네임 : {username}
              <span
                className="editNameBtn"
                onClick={() => {
                  setUpdateName(true);
                }}>
                <Button text={"수정"} bgcolor={"white"} txtcolor={"orange"} border={"1px solid"} padding={"0 1rem"} />
              </span>
            </p>
            <span
              className="userInfoBtn"
              onClick={() => {
                setUpdatePass(true);
              }}>
              <Button text={"비밀번호 변경"} bgcolor={"orange"} txtcolor={"white"} round={true} />
            </span>
            <span onClick={handleUserDelete}>
              <Button text="회원 탈퇴" bgcolor="orange" txtcolor="white" round={true} padding="0 2rem" />
            </span>
          </div>
        </UserInfoBox>
      </MypageContent>
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.section`
  width: 100vw;
  height: 91vh;
  background-color: #f0f1f3;
  ${media.mobile} {
    width: 100vw;
  }
`;
const MypageContent = styled.div`
  width: 600px;
  margin: 0 auto;
  padding-top: 80px;

  h2 {
    ${({ theme }) => theme.font.xlarge};
    margin-bottom: 40px;
    margin-left: 16px;

    span {
      ${({ theme }) => theme.font.bold}
    }
  }
`;

const UserInfoBox = styled.div`
  width: 600px;
  height: 400px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  padding: 60px;
  ${({ theme }) => theme.font.medium};
  box-shadow: 3px 7px 14px 0 rgba(0, 0, 0, 0.05);

  h3 {
    ${({ theme }) => theme.font.bold};
    ${({ theme }) => theme.font.xlarge};
    padding-bottom: 40px;
  }
  p {
    margin-bottom: 28px;
    width: 70%;
    position: relative;
  }
  .editNameBtn {
    margin-left: 60px;
    position: absolute;
    top: -12px;
    right: -40px;
  }
  .userInfoBtn {
    display: inline-block;
    margin-top: 40px;
    margin-right: 1.2rem;
  }
  ${media.mobile} {
    width: 100%;
    padding: 40px 20px;
    padding-top: 60px;
  }
`;

const LogoutBtn = styled.div`
  display: none;
  ${media.mobile} {
    display: inline-block;
    border: 1px solid ${({ theme }) => theme.color.black};
    border-radius: 999px;
    margin-left: 28px;
    padding: 6px 10px;
    ${({ theme }) => theme.font.medium};

    .logout {
      color: ${({ theme }) => theme.color.black};
      text-decoration: none;
    }
  }
`;
