// pages/data.jsx
import React from 'react';
import Navbar from '../components/Navbar';  // 引入导航栏组件
//import '../index.css';  // 引入全局样式
import './style.css';
import './common.css';


const dataItems = [
  {
    title: "股票分钟数据 (cn_stock_bar1m)",
    description: "该表记录了股票市场中各个证券的1分钟无复权行情数据。",
    updated: "2024-09-26 17:29:30",
    author: "BigQuant",
    downloadType: "免费",
  },
  {
    title: "股票估值指标 (cn_stock_valuation)",
    description: "该表记录了中国A股股票的估值数据。",
    updated: "2024-09-26 14:06:55",
    author: "BigQuant",
    downloadType: "免费",
  },
];

const downloadData = (dataset) => {
  console.log(`Downloading ${dataset}...`);
};


function DataPage() {
  return (
    <div className="data-page">
      <Navbar />  {/* 使用导航栏组件 */}

      <div className="content-wrapper">  {/* 添加一个外层容器管理布局 */}
        <aside className="sidebar">
          <ul>
            <li><a href='#'>通用数据</a></li>
            <li><a href='#'>股票数据</a></li>
            <li><a href='#'>公司信息</a></li>
            <li><a href='#'>财务数据</a></li>
            <li><a href='#'>宏观数据</a></li>
            <li><a href='#'>量化因子</a></li>
            {/* 更多菜单选项... */}
          </ul>
        </aside>

        <main className="data-content">
          <h1>数据平台</h1>
          <div className="data-grid">
            {dataItems.map((item, index) => (
              <div key={index} className="data-item">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>更新时间: {item.updated}</p>
                <p>作者: {item.author}</p>
                <button onClick={() => downloadData(item.title)}>下载数据</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DataPage;
