// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h1>KakiQuant</h1>
      </div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/programming">编写策略</Link></li>
        <li><Link to="/data">数据平台</Link></li>
        <li><Link to="/factors">因子研究</Link></li>
        <li><Link to="/strategy">策略社区</Link></li>
        <li><Link to="/trading">我的交易</Link></li>
        <li><Link to="/about">关于我们</Link></li>

        <li className="dropdown">
          知识库
          <div className="dropdown-content">
            <Link to="https://api.kakiquant.icu/">KakiAPI</Link>
            <Link to="https://kakiquant.github.io/">简介</Link>
            <Link to="/doc2">课程</Link>
            <Link to="/doc2">新手指引</Link>
          </div>
        </li>
      </ul>
      <div>
        <Link to="/login"><button>登录</button></Link>
      </div>
    </nav>
  );
}

export default Navbar;
