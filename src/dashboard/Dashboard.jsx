import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { MenuCloseIcon, MenuOpenIcon, NewsIcon, SpeakerIcon, TimetableIcon } from '../icons';
import { NavLink, Route, Routes } from 'react-router-dom';
import News from '../pages/News';
import Announcement from '../pages/Announcement';
import Timetable from '../pages/Timetable';
import Login from '../pages/Login';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      id: 3,
      label: 'Новости',
      icon: <NewsIcon />,
      path: 'news',
      component: News
    },
    {
      id: 1,
      label: 'Объявление',
      icon: <SpeakerIcon />,
      path: 'announce',
      component: Announcement
    },
    {
      id: 2,
      label: 'Расписание',
      icon: <TimetableIcon />,
      path: 'timetable',
      component: Timetable
    },
  ];

  return (
    <Layout className='min-h-[100vh]'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical py-4" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['3']}
        >
          {items.map((item) => (
            <Menu.Item key={item.id} icon={item.icon}>
              <NavLink to={item.path} activeClassName="ant-menu-item-selected">
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuCloseIcon /> : <MenuOpenIcon />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            {items.map((item) => (
              <Route key={item.id} path={item.path} element={<item.component />} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;