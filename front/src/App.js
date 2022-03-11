import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import theme from "./styles/theme";
import axios from "axios";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
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
  Loading,
  // UpdateNameModal,
  // UpdatePassModal,
} from "./pages";
import { Header } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: false,
    },
  },
});

function App() {
  const [msg, setMsg] = useState("이 글자가 보인다면 api서버와 연결이 안된 겁니다.");
  useEffect(() => {
    axios("/api/user/temp")
      .then((res) => setMsg(res.data))
      .catch(console.log);
  }, []);

  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {/* <p>{msg}</p> */}
            <React.Suspense fallback={<Loading />}>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recommend" element={<RecommendMain />} />
                <Route path="/result" element={<Result />} />
                <Route path="/detail/:id" element={<RecipeDetail />} />
                <Route path="/refrige" element={<Refrige />} />
                <Route path="/bookmark" element={<Bookmark />} />
                <Route path="/shoppinglist" element={<ShoppingList />} />
                <Route path="/teamIntro" element={<div>팀소개</div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signupPass" element={<SignupPass />} />
                <Route path="/signupNick" element={<SignupNick />} />
                <Route path="/mypage" element={<Mypage />} />
                {/* <Route path="/UpdateNameModal" element={<UpdateNameModal />} />
                <Route path="/UpdatePassModal" element={<UpdatePassModal />} /> */}
              </Routes>
            </React.Suspense>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
