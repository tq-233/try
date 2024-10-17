import React, { useState } from 'react';
import { Table, Button, Modal, Input, TreeSelect, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css'; // 引入 Ant Design 样式
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip as ChartTooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import Navbar from '../components/Navbar';  // 引入导航栏组件
//import '../style/factor.css'; // 引入因子页面样式
import './factor.css';

// 假数据 for charts and heatmap
const chartData = [
  { name: '2018', factor1: 0.2, factor2: 0.1 },
  { name: '2019', factor1: 0.4, factor2: 0.2 },
  { name: '2020', factor1: 0.3, factor2: 0.3 },
  { name: '2021', factor1: 0.5, factor2: 0.2 },
  { name: '2022', factor1: 0.6, factor2: 0.4 },
];

// Custom colors for Pie and Radar charts
const COLORS = ['#ff9800', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

// 因子数据
const factorData = [
  {
    key: '1',
    factorName: 'Alpha101因子第64',
    oneYearReturn: '89.39%',
    oneMonthReturn: '5.85%',
    threeMonthReturn: '6.90%',
    fiveYearReturn: '38.97%',
    description: 'Alpha101因子第64 is a market cap-weighted factor.',
    ic: 0.0074,
    ir: 0.0781,
    turnover: 0.5327,
    returnRatio: 1.2937,
  },
  {
    key: '2',
    factorName: 'Alpha191因子第17',
    oneYearReturn: '30.51%',
    oneMonthReturn: '18.96%',
    threeMonthReturn: '6.58%',
    fiveYearReturn: '26.97%',
    description: 'Alpha191因子第17 is a price momentum-based factor.',
    ic: 0.0128,
    ir: 0.0216,
    turnover: 0.4687,
    returnRatio: 0.8395,
  },
  {
    key: '3',
    factorName: 'Alpha251因子第98',
    oneYearReturn: '44.13%',
    oneMonthReturn: '10.45%',
    threeMonthReturn: '11.32%',
    fiveYearReturn: '29.85%',
    description: 'Alpha251因子 focuses on low-volatility stocks.',
    ic: 0.0101,
    ir: 0.0658,
    turnover: 0.5971,
    returnRatio: 1.0452,
  },
  {
    key: '4',
    factorName: 'Alpha303因子第72',
    oneYearReturn: '55.26%',
    oneMonthReturn: '15.68%',
    threeMonthReturn: '12.34%',
    fiveYearReturn: '31.21%',
    description: 'Alpha303因子 tracks liquidity in high-cap stocks.',
    ic: 0.0056,
    ir: 0.0817,
    turnover: 0.4412,
    returnRatio: 1.1849,
  },
  {
    key: '5',
    factorName: 'Alpha401因子第47',
    oneYearReturn: '20.15%',
    oneMonthReturn: '9.86%',
    threeMonthReturn: '8.92%',
    fiveYearReturn: '19.45%',
    description: 'Alpha401因子 is focused on earnings growth stocks.',
    ic: 0.0049,
    ir: 0.0562,
    turnover: 0.5205,
    returnRatio: 0.9038,
  },
  // Additional factor data for visualization
  {
    key: '6',
    factorName: 'Alpha510因子第29',
    oneYearReturn: '60.12%',
    oneMonthReturn: '11.32%',
    threeMonthReturn: '14.67%',
    fiveYearReturn: '36.78%',
    description: 'Alpha510因子 targets dividend yield stocks.',
    ic: 0.0069,
    ir: 0.0735,
    turnover: 0.5763,
    returnRatio: 1.3421,
  },
  
];

// 因子目录层级数据
const treeData = [
  {
    title: '系统因子',
    value: '系统因子',
    children: [
      {
        title: 'Alpha101因子',
        value: 'Alpha101因子',
      },
      {
        title: 'Alpha191因子',
        value: 'Alpha191因子',
      },
    ],
  },
  {
    title: '社区因子',
    value: '社区因子',
    children: [
      {
        title: '基础信息因子',
        value: '基础信息因子',
      },
      {
        title: '技术分析因子',
        value: '技术分析因子',
      },
      {
        title: '财务因子',
        value: '财务因子',
      },
    ],
  },
];

const FactorPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  // 搜索功能
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // 过滤搜索结果
  const filteredData = factorData.filter(factor =>
    factor.factorName.toLowerCase().includes(searchQuery)
  );

  // 显示模态框
  const showModal = (record) => {
    setSelectedFactor(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Navbar />
      <div className="factor-page">
        <h1>因子研究看板</h1>

        {/* 因子目录选择 */}
        <TreeSelect
          treeData={treeData}
          value={selectedCategory}
          onChange={setSelectedCategory}
          treeCheckable={true}
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          placeholder="选择目录"
          style={{ width: '300px', marginBottom: '20px' }}
          allowClear
        />

        {/* 搜索输入框 */}
        <Input.Search
          placeholder="搜索因子..."
          onChange={handleSearch}
          style={{ marginBottom: 20, width: '300px' }}
        />

        {/* 因子表格 */}
        <Table columns={[
          {
            title: '因子名称',
            dataIndex: 'factorName',
            key: 'factorName',
            render: (text, record) => (
              <Tooltip title={`IC: ${record.ic} | IR: ${record.ir}`} placement="right">
                <Link to={`/factor/${record.key}`}>{text}</Link>
              </Tooltip>
            ),
            sorter: (a, b) => a.factorName.localeCompare(b.factorName),
          },
          {
            title: '1年多头收益率',
            dataIndex: 'oneYearReturn',
            key: 'oneYearReturn',
            sorter: (a, b) => parseFloat(a.oneYearReturn) - parseFloat(b.oneYearReturn),
          },
          {
            title: '操作',
            key: 'action',
            render: (_, record) => (
              <Button type="primary" onClick={() => showModal(record)}>
                查看详情
              </Button>
            ),
          },
        ]} dataSource={filteredData} pagination={false} />

        {/* 模态框 */}
        <Modal
          title="因子详情"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {selectedFactor && (
            <div>
              <p><strong>因子名称:</strong> {selectedFactor.factorName}</p>
              <p><strong>IC:</strong> {selectedFactor.ic}</p>
              <p><strong>IR:</strong> {selectedFactor.ir}</p>
              <p><strong>换手率:</strong> {selectedFactor.turnover}</p>
              <p><strong>收益率:</strong> {selectedFactor.returnRatio}</p>
            </div>
          )}
        </Modal>

        {/* 顶部因子图表展示 */}
        <h2>因子表现图表</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Legend />
              <Line type="monotone" dataKey="factor1" stroke="#ff9800" />
              <Line type="monotone" dataKey="factor2" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap and additional charts */}
        <h2>因子排名与更多图表</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <ChartTooltip />
              <Legend />
              <Bar dataKey="factor1" fill="#ff9800" />
              <Line type="monotone" dataKey="factor2" stroke="#00C49F" />
              <Area type="monotone" dataKey="factor2" fill="#8884d8" />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={chartData} dataKey="factor1" outerRadius={80} fill="#8884d8">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Factor 1" dataKey="factor1" stroke="#ff9800" fill="#ff9800" fillOpacity={0.6} />
                <Radar name="Factor 2" dataKey="factor2" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactorPage;
