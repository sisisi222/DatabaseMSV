import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './component/about/About'
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Search from './component/search/Search';
import SignUp from './component/signUp/SignUp';
import LogIn from './component/logIn/LogIn';
import PurchaseTicket from './component/purchaseTicket/PurchaseTicket';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:4000/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path='/search' exact element={<Search />} />
          <Route path='/signup' exact element={<SignUp />} />
          <Route path='/about' exact element={<About />} />
          <Route path='/login' exact element={<LogIn />} />
          <Route path='/purchaseTicket' exact element={<PurchaseTicket />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
  
  }


export default App;
