// pages/trading.jsx
import React, { useState } from 'react';
import { Table, Button } from 'antd'; // 引入Ant Design的组件
import Navbar from '../components/Navbar'; // 导航栏
import Footer from '../components/Footer'; // 页脚
//import '../index.css'; // 引入全局样式
import { Link } from 'react-router-dom';
import './common.css';

const strategies = [
  {
    key: '1',
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
    key: '2',
    name: '股市逐浪者01',
    type: '股票',
    todayReturn: '0.68%',
    totalReturn: '0.68%',
    resources: '2C/80G',
    startDate: '2024-04-01',
    updateDate: '2024-06-21 13:44:26',
    status: '已停止',
  },
];

const columns = [
  {
    title: '策略名称',
    dataIndex: 'name',
    render: (text) => <Link to={`/strategy/${text}`}>{text}</Link>, // 可点击的策略名称链接
  },
  {
    title: '今日收益',
    dataIndex: 'todayReturn',
  },
  {
    title: '累计收益',
    dataIndex: 'totalReturn',
  },
  {
    title: '资源规格',
    dataIndex: 'resources',
  },
  {
    title: '运行开始日期',
    dataIndex: 'startDate',
  },
  {
    title: '更新日期',
    dataIndex: 'updateDate',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

const Trading = () => {
  const [tab, setTab] = useState('模拟交易'); // 当前选中的标签

  return (
    <div>
      <Navbar />
      <div className="trading-page">
        {/* 顶部切换按钮 */}
        <div className="tab-switch">
          <Button
            className={tab === '模拟交易' ? 'active' : ''}
            onClick={() => setTab('模拟交易')}
            style={{ color: 'black', backgroundColor: '#ff9800', marginLeft: '20px'}}
          >
            模拟交易
          </Button>
          <Button
            className={tab === '我的组合' ? 'active' : ''}
            onClick={() => setTab('我的组合')}
            style={{ color: 'black', backgroundColor: '#f0f0f0', marginLeft: '20px'}}
            
          >
            我的组合
          </Button>
        </div>

        {/* 模拟交易或我的组合内容 */}
        {tab === '模拟交易' && (
          <div className="simulated-trading" style={{marginLeft: '20px',fontSize:'25px', color:'ghostwhite'}}>
            <h2>模拟交易总览</h2>
            <p>今日收益: <span>0.34%</span></p>
            <p>近一周收益: <span>0.34%</span></p>
            <p>累计收益: <span>0.34%</span></p>

            {/* 策略列表 */}
            <Table columns={columns} dataSource={strategies} pagination={false} />
          </div>
        )}

        {tab === '我的组合' && (
          <div className="my-portfolio">
            <h2>我的组合</h2>
            {/* 组合数据... */}
            <p>暂无组合数据，请点击下方创建新的组合。</p>
            <Button className="create-portfolio-btn" type="primary">+ 创建组合</Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Trading;
