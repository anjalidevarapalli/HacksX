import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
  return (
    <div className="home-container">
      <div className="title">
        Lyric Analyzer
      </div>

      {/* GIF Image */}
      <div className="gif-container">
        <img 
          src="/assets/lottie-animation.gif" 
          alt="Animation" 
          width="100%" 
          height="auto"
        />
      </div>
    </div>
  );
};

export default Home;