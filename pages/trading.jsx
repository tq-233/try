// pages/trading.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // 导航栏
import Footer from '../components/Footer'; // 页脚
//import '../index.css'; // 引入全局样式
import './trading.css';

const strategies = [
  {
    name: '龙头股密语-1D',
    type: '股票',
    todayReturn: '0.00%',
    totalReturn: '0.00%',
    resources: '2C/80G',
    startDate: '2024-04-01',
    updateDate: '2024-06-21 13:44:26',
    status: '已停止',
  },
  {
    name: '股市逐浪者01',
    type: '股票',
    todayReturn: '0.68%',
    totalReturn: '0.68%',
    resources: '2C/80G',
    startDate: '2024-04-01',
    updateDate: '2024-06-21 13:44:26',
    status: '已停止',
  },
  // 更多策略...
];

const Trading = () => {
  const [tab, setTab] = useState('模拟交易'); // 当前选中的标签

  return (
    <div>
      <Navbar />
      <div className="trading-page">
        {/* 顶部切换按钮 */}
        <div className="tab-switch">
          <button
            className={tab === '模拟交易' ? 'active' : ''}
            onClick={() => setTab('模拟交易')}
          >
            模拟交易
          </button>
          <button
            className={tab === '我的组合' ? 'active' : ''}
            onClick={() => setTab('我的组合')}
          >
            我的组合
          </button>
        </div>

        {/* 模拟交易或我的组合内容 */}
        {tab === '模拟交易' && (
          <div className="simulated-trading">
            <h2>模拟交易总览</h2>
            <p>今日收益: <span>0.34%</span></p>
            <p>近一周收益: <span>0.34%</span></p>
            <p>累计收益: <span>0.34%</span></p>

            {/* 策略列表 */}
            <table>
              <thead>
                <tr>
                  <th>策略名称</th>
                  <th>今日收益</th>
                  <th>累计收益</th>
                  <th>资源规格</th>
                  <th>运行开始日期</th>
                  <th>更新日期</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {strategies.map((strategy, index) => (
                  <tr key={index}>
                    <td>{strategy.name} <span>{strategy.type}</span></td>
                    <td>{strategy.todayReturn}</td>
                    <td>{strategy.totalReturn}</td>
                    <td>{strategy.resources}</td>
                    <td>{strategy.startDate}</td>
                    <td>{strategy.updateDate}</td>
                    <td>{strategy.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === '我的组合' && (
          <div className="my-portfolio">
            <h2>我的组合</h2>
            {/* 组合数据... */}
            <p>暂无组合数据，请点击下方创建新的组合。</p>
            <button className="create-portfolio-btn">+ 创建组合</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Trading;
