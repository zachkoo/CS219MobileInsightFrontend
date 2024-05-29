import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FileListPage } from './pages/FileListPage';
import LogItemsPage from './pages/ItemListPage';
import ItemDetailPage from './pages/ItemDetailPage';
import { Layout, Menu, theme } from 'antd';
import { FileOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        <Sider>
          <div className="demo-logo-vertical" />
          <MenuComponent />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 1200,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<FileListPage />} />
              <Route path="/log/:filename" element={<LogItemsPage />} />
              <Route path="/item/:logItem" element={<ItemDetailPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const MenuComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <FileOutlined />,
          label: 'Log File',
          onClick: () => navigate('/'),
        },
        {
          key: '2',
          icon: <FileOutlined />,
          label: 'Test',
          onClick: () => navigate(''),
        },
      ]}
    />
  );
};

export default App;