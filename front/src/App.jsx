import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState(
    "이 글자가 보인다면 api서버와 연결이 안된 겁니다."
  );
  useEffect(() => {
    axios("/api/user/temp")
      .then((res) => setMsg(res.data))
      .catch(console.log);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>{msg}</p>
      </header>
    </div>
  );
}

export default App;
