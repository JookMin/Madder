import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Chat from "./routes/Chat";
import Main from "./routes/Main";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/chatroom" element={<Chatroom />}>
        </Route> */}
        <Route path="/chatroom/:id" element={<Detail />}>
        </Route>
        <Route path="/" element={<Main />}>
        </Route>
        <Route path="/chatroom" element={<Chat />}>
        </Route>
        <Route path="/profile" element={<Profile />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;