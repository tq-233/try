import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Navbar from '../components/Navbar'; // 导航栏
import Footer from '../components/Footer'; // 页脚
import '../index.css'; // 引入全局样式
import './Login.css'; // Import the new login styles

const Login = () => {
  const [username, setUsername] = useState(''); // Username input
  const [password, setPassword] = useState(''); // Password input
  const [message, setMessage] = useState(''); // State for displaying messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [nickname, setNickname] = useState(null); // Store the user's nickname after login

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Send POST request to backend login endpoint
      const response = await axios.post('http://10.201.8.89:8000/login', {
        username,
        password,
      });

      if (response.data.code === 0) {
        // Login successful, store token and nickname
        localStorage.setItem('token', response.data.access_token); // Store token
        setNickname(response.data.nickname); // Assuming the backend sends the nickname
        setMessage('登录成功！');
        setTimeout(() => {
          navigate('/settings'); // Redirect to settings page
        }, 2000);
      } else {
        // Handle login failure
        setMessage(response.data.msg || '登录失败，请重试。');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg || '登录失败，请重试。');
      } else {
        setMessage('登录失败，请检查网络连接。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {nickname && (
        <div className="user-circle">
          {nickname[0].toUpperCase()}
        </div>
      )}
      <div className="login-container">
        <h2>登录</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">用户名:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          没有账号？<a href="/register">注册</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
