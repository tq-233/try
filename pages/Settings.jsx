// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // 导航栏
import Footer from '../components/Footer'; // 页脚
import { useNavigate } from 'react-router-dom';
import './Settings.css'; // 引入全局样式

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [apiQuota, setApiQuota] = useState({
    totalQuota: 0,
    usedQuota: 0,
  });
  const [apiKeys, setApiKeys] = useState([]); // Initialize apiKeys as an empty array
  const [newApiKeyName, setNewApiKeyName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    } else {
      // Fetch user info, API quota, and API keys
      fetchUserInfo();
      fetchApiQuota();
      fetchApiKeys();
    }
  }, [token, navigate]);

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://10.201.8.89:8000/users/info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Fetch API quota
  const fetchApiQuota = async () => {
    try {
      const response = await axios.get('http://10.201.8.89:8000/users/api-quota', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApiQuota(response.data);
    } catch (error) {
      console.error('Error fetching API quota:', error);
    }
  };

  // Fetch API keys
  const fetchApiKeys = async () => {
    try {
      const response = await axios.get('http://10.201.8.89:8000/users/api-keys', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure apiKeys is defined and is an array
      if (response.data && Array.isArray(response.data.api_keys)) {
        setApiKeys(response.data.api_keys);
      } else {
        setApiKeys([]); // Default to an empty array if no keys are returned
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setApiKeys([]); // Ensure apiKeys is always an array
    }
  };

  // Handle input changes for user info
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle updating user info
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const updateData = { ...userInfo };
      if (password) {
        updateData.password = password;
      }
      const response = await axios.put('http://10.201.8.89:8000/users/update', updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('信息更新成功！');
      setUserInfo(response.data);
      setPassword('');
    } catch (error) {
      setMessage('更新失败，请重试。');
      console.error('Error updating user info:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle creating a new API key
  const handleCreateApiKey = async () => {
    if (!newApiKeyName) {
      setMessage('请提供API密钥名称。');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        'http://10.201.8.89:8000/users/api-keys',
        { name: newApiKeyName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('API密钥创建成功！');
      fetchApiKeys(); // Refresh API keys
      setNewApiKeyName('');
    } catch (error) {
      setMessage('API密钥创建失败，请重试。');
      console.error('Error creating API key:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting an API key
  const handleDeleteApiKey = async (keyId) => {
    if (!window.confirm('确定要删除此API密钥吗？')) return;
    setLoading(true);
    setMessage('');
    try {
      await axios.delete(`http://10.201.8.89:8000/users/api-keys/${keyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('API密钥已删除。');
      fetchApiKeys(); // Refresh API keys
    } catch (error) {
      setMessage('删除API密钥失败，请重试。');
      console.error('Error deleting API key:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="settings-container">
        <h2>个人设置</h2>
        <form onSubmit={handleUpdateInfo}>
          <div className="form-group">
            <label>用户名：</label>
            <input type="text" name="username" value={userInfo.username} disabled />
          </div>
          <div className="form-group">
            <label>昵称：</label>
            <input
              type="text"
              name="nickname"
              value={userInfo.nickname || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>电子邮件：</label>
            <input
              type="email"
              name="email"
              value={userInfo.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>新密码：</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? '更新中...' : '更新信息'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}

        <h3>API 配额</h3>
        <div className="api-quota">
          <p>总配额：{apiQuota.totalQuota}</p>
          <p>已使用：{apiQuota.usedQuota}</p>
          <p>剩余：{apiQuota.totalQuota - apiQuota.usedQuota}</p>
        </div>

        <h3>API 密钥管理</h3>
        <div className="api-keys">
          <div className="new-api-key">
            <input
              type="text"
              placeholder="新API密钥名称"
              value={newApiKeyName}
              onChange={(e) => setNewApiKeyName(e.target.value)}
            />
            <button onClick={handleCreateApiKey} disabled={loading}>
              {loading ? '创建中...' : '创建API密钥'}
            </button>
          </div>
          <table className="api-keys-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>密钥</th>
                <th>创建日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(apiKeys) && apiKeys.length > 0 ? (
                apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td>{key.name}</td>
                    <td>{key.key}</td>
                    <td>{new Date(key.created_at).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleDeleteApiKey(key.id)}>删除</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">没有API密钥。</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          登出
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
