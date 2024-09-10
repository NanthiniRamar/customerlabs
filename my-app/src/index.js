import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import './index.css'

const App = () => {

  return (
    <div>
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <App/>,
  rootElement
)

