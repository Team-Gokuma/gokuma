import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import theme from './styles/theme';
import axios from 'axios';

function App() {
  const [msg, setMsg] = useState('이 글자가 보인다면 api서버와 연결이 안된 겁니다.');
  useEffect(() => {
    axios('/api/user/temp')
      .then((res) => setMsg(res.data))
      .catch(console.log);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <p>{msg}</p>
        <div>home</div>
      </div>
    </ThemeProvider>
  );
}

export default App;
