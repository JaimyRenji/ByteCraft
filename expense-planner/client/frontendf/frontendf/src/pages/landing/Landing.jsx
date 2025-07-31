import React from "react";
import "./Landing.css";
import landingdesign from "../../images/landingdesign.png";
export const Landing=()=> {
  return (
    <div className="b">
    <div className="hero">
        <div className="logoh"><p>ByteCraft</p></div>
      <div className="hero-cont">
        <div className="hero-left">
          <h1>Track your daily expenses easily!!! </h1>
          <a href="/auth"><button class="join-button">Get Started</button></a>
        </div>
        <div className="hero-right">
        <img class="heroh" src={landingdesign}></img>
        </div>
      </div>
    </div>
    </div>
  );
};