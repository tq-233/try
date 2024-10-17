// pages/programming.jsx
import React, { useState } from 'react';
import Iframe from 'react-iframe';
import MonacoEditor from 'react-monaco-editor';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import Navbar from '../components/Navbar';  // 引入导航栏
//import '../index.css';  // 引入全局样式
import './programming.css';

const ProgrammingPage = () => {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, world!")`);

  const editorDidMount = (editor, monaco) => {
    console.log('Editor mounted!', editor);
  };

  const handleRunCode = () => {
    // 运行代码的逻辑可以通过连接后端的 Jupyter API 来实现
    console.log("Running code:", code);
  };

  return (
    <div className="programming-page">
      <Navbar />
      <h1>在线编程与 Jupyter Notebook</h1>
      {/* Jupyter Notebook Viewer */}
      <div className="notebook-section">
        <Iframe
          url="https://nbviewer.jupyter.org/urls/jupyter.org/assets/jupytervideo.ipynb"
          width="100%"
          height="600px"
          className="jupyter-iframe"
          display="initial"
          position="relative"
        />
      </div>

      {/* 实时代码编辑器 (Monaco Editor) */}
      <div className="code-editor-section">
        <MonacoEditor
          width="100%"
          height="400px"
          language="python"
          theme="vs-dark"
          value={code}
          options={{
            selectOnLineNumbers: true
          }}
          onChange={(newValue) => setCode(newValue)}
          editorDidMount={editorDidMount}
        />
        <Button type="primary" onClick={handleRunCode} style={{ marginTop: 10 }}>
          运行代码
        </Button>
      </div>

      {/* 动态背景科技效果 */}
      <div className="background-effect">
        {/* 这里可以嵌入 Three.js 或其他视觉效果 */}
      </div>
    </div>
  );
};

export default ProgrammingPage;
