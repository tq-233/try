// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import './style.css'
//import './common.css'
import './Home.css'


function HomePage() {
  return (
    <div> 
      <div className="heroSection">
        <h1>欢迎来到KakiQuant量化投资平台!</h1>
        <p>结合人工智能与量化策略，优化你的投资组合。</p>
      </div>
      <div>
        <Link to="/strategy" className="button">社区策略</Link>
        <Link to="/login" className="button">立即体验</Link>
      </div>
    </div> 
  );
}

export default HomePage;


