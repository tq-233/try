// pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Navbar from '../components/Navbar'; // 导航栏
import Footer from '../components/Footer'; // 页脚
//import '../index.css'; // 引入全局样式
import './common.css';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState(''); // Username input
  const [password, setPassword] = useState(''); // Password input
  const [inviteCode, setInviteCode] = useState(''); // Optional invite code
  const [message, setMessage] = useState(''); // State for displaying messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Send POST request to backend register endpoint
      const response = await axios.post('http://10.201.8.89:8000/register', {
        username,
        password,
        invite_code: inviteCode || undefined, // Include invite_code if provided
      });

      if (response.data.code === 0) {
        // Registration successful
        setMessage('注册成功！正在跳转到登录页...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 2000);
      } else {
        // Handle registration failure
        setMessage(response.data.msg || '注册失败，请重试。');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg || '注册失败，请重试。');
      } else {
        setMessage('注册失败，请检查网络连接。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <h2>注册</h2>
        <form onSubmit={handleRegister}>
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
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inviteCode">邀请码（可选）:</label>
            <input
              type="text"
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          已有账号？<a href="/login">登录</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
