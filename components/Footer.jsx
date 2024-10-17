// components/Footer.jsx
import React from 'react';
import '../index.css'; // 引入全局样式

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 关于我们部分 */}
        <div className="footer-section">
          <h3>关于KakiQuant</h3>
          <ul>
            <li><a href="/about">关于我们</a></li>
            <li><a href="/careers">加入我们</a></li>
            <li><a href="/partnerships">商务合作</a></li>
            <li><a href="/tech">宽邦科技</a></li>
            <li><a href="/terms">用户条款 / 隐私协议</a></li>
          </ul>
        </div>

        {/* 帮助与支持部分 */}
        <div className="footer-section">
          <h3>帮助与支持</h3>
          <ul>
            <li><a href="/getting-started">新手入门</a></li>
            <li><a href="/faq">常见问题</a></li>
            <li><a href="/academy">量化学院</a></li>
            <li><a href="/docs">文档</a></li>
            <li><a href="/feedback">反馈建议</a></li>
          </ul>
        </div>

        {/* 关注我们部分 */}
        <div className="footer-section">
          <h3>关注我们</h3>
          <ul>
            <li><a href="https://www.douyin.com">抖音</a></li>
            <li><a href="https://www.bilibili.com">B站</a></li>
            <li><a href="https://www.zhihu.com">知乎</a></li>
            <li><a href="https://weibo.com">微博</a></li>
          </ul>
        </div>

        {/* 二维码部分 */}
        <div className="footer-section qr-section">
          <h3>联系我们</h3>
          <div className="qr-codes">
            <div className="qr-code">
              <img src="../assets/img.png" alt="微信客服" />
              <p>微信客服</p>
            </div>
            <div className="qr-code">
              <img src="../assets/img.png" alt="用户QQ群" />
              <p>用户QQ群</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
