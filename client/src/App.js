import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './components/Authorize';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [imageList, setImageList] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("userProfile")) {
      setIsLoggedIn(false)

    }

    changeColor()
  }, [isLoggedIn])

  const colors = ["#bbf6ff", "#b6e7ff", "#b6caff", "#e8b6ff"];

  const changeColor = () => {

    var lastColorIndex = localStorage.getItem('lastColorIndex') || -1;
    var randomColor = -1;
    var randomHeaderColor = -1;
    while (lastColorIndex == randomColor || randomColor === -1) {
      randomColor = Math.floor(Math.random() * colors.length);
      randomHeaderColor = Math.floor(Math.random() * colors.length);
      while (randomColor == randomHeaderColor) {
        randomHeaderColor = Math.floor(Math.random() * colors.length);
      }
    };
    localStorage.setItem('lastColorIndex', randomColor);

    document.body.style.backgroundColor = colors[randomColor];
    document.querySelector("html").style.backgroundColor = colors[randomColor];
    document.querySelector("#header").style.backgroundColor = colors[randomHeaderColor];
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setImageList={setImageList} changeColor={changeColor}/>
      {isLoggedIn
        ? <ApplicationViews changeColor={changeColor} imageList={imageList} setImages={setImages} images={images} />
        : <Authorize setIsLoggedIn={setIsLoggedIn} />
      }
    </Router>
  );
}

export default App;
