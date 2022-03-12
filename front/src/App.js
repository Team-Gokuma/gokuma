import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import theme from "./styles/theme";
import axios from "axios";
import { RecoilRoot } from "recoil";
import {
  Home,
  RecommendMain,
  Result,
  RecipeDetail,
  Login,
  Signup,
  SignupPass,
  Refrige,
  Bookmark,
  ShoppingList,
  SignupNick,
  Mypage,
  TeamIntro, 
} from "./pages";
import { Header } from "./components";

function App() {
  const [msg, setMsg] = useState("이 글자가 보인다면 api서버와 연결이 안된 겁니다.");
  useEffect(() => {
    axios("/api/user/temp")
      .then((res) => setMsg(res.data))
      .catch(console.log);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RecoilRoot>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommend" element={<RecommendMain />} />
            <Route path="/result" element={<Result />} />
            <Route path="/detail/:id" element={<RecipeDetail />} />
            <Route path="/refrige" element={<Refrige />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/shoppinglist" element={<ShoppingList />} />
            <Route path="/teamIntro" element={<TeamIntro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupPass" element={<SignupPass />} />
            <Route path="/signupNick" element={<SignupNick />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
