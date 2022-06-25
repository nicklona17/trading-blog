import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import CreatePost from './components/createPost/CreatePost';
import Login from './components/login/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import StockTickers from './components/stockTickers/StockTickers';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  }
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createpost"> Create Post </Link>
            <button className="logOutButton" onClick={signUserOut}> Log Out </button>
          </>
        )}
      </nav>
      <StockTickers />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
