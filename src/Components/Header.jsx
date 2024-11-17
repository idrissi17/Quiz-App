import React from "react";
import myImage from "../assets/pngwing.com.png"

function Header() {
  return (
    <header className="app-header">
      <img src={myImage} alt="React logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
