import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detail from './routes/Detail'
import Home from './routes/Home'
import Chat from './routes/Chat'
import Main from './routes/Main'
import Main2 from './routes/Main2'
import Login from './routes/Login'
import KaKao from './routes/KaKao'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/chatroom" element={<Chatroom />}>
        </Route> */}
        <Route path="/chatroom/:id" element={<Detail />}></Route>
        <Route path="/Main" element={<Main />}></Route>
        <Route path="/chatroom" element={<Chat />}></Route>
        <Route path="/" element={<Main2 />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/oauth" element={<KaKao />} />
      </Routes>
    </Router>
  )
}

export default App
