import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import theme from "./styles/theme";
import axios from "axios";
import { RecoilRoot } from "recoil";
import { Home, Recommend, Result } from "./pages";
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
        <p>{msg}</p>
        <RecoilRoot>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="result" element={<Result />} />
            <Route path="/refrige" element={<div>냉장고</div>} />
            <Route path="/teamIntro" element={<div>팀소개</div>} />
            <Route path="/login" element={<div>로그인</div>} />
            <Route path="/signup" element={<div>회원가입</div>} />
            <Route path="/mypage" element={<div>마이페이지</div>} />
          </Routes>
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
