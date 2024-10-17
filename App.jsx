// App.jsx
import React from 'react';
import Navbar from './components/Navbar'; // 引入分离出来的导航栏组件
import Footer from './components/Footer';
function App() {
  const titleStyle = {
    fontSize: '38px',
    fontFamily: 'Arial, sans-serif',
    color: '#dcf7f6'
  };

  const paragraphStyle = {
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    color: '#dcf7f6'
  };

  return (
    <div className="App">
      <Navbar />  {/* 使用分离出来的导航栏组件 */}

      <div className="hero-section">
        <h1 style={titleStyle}>欢迎来到KakiQuant量化投资平台!</h1>
        <p style={paragraphStyle}>结合人工智能与量化策略，优化你的投资组合。</p>
      </div>
        <Footer />
      <footer>

      </footer>
    </div>
  );
}

export default App;
