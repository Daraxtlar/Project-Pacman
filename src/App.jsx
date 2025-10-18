import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header></Header>
        <div>Środek</div>
        <Footer></Footer>
    </>
  )
}

export default App
