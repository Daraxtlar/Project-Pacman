import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./Pages/Home.jsx";
function App() {

  return (
    <>
        <Header></Header>
        <Home/>
        <Footer></Footer>
    </>
  )
}

export default App
