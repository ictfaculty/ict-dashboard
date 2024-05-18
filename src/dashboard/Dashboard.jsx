import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { MenuCloseIcon, MenuOpenIcon, NewsIcon, SpeakerIcon, TimetableIcon } from '../icons';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import News from '../pages/News';
import Announcement from '../pages/Announcement';
import Timetable from '../pages/Timetable';
import Login from '../pages/Login';
import { BellFilled, DollarCircleFilled, LogoutOutlined, ProjectFilled, UserSwitchOutlined } from '@ant-design/icons';
import Trimester from '../pages/Trimester';

const { Header, Sider, Content } = Layout;


const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const items = [
    {
      id: '/dashboard/timetable',
      label: 'Студенты',
      icon: <UserSwitchOutlined />,
      path: 'timetable',
      component: Timetable
    },
    {
      id: '/dashboard/trimester',
      label: 'Триместр',
      icon: <DollarCircleFilled />,
      path: 'trimester',
      component: Trimester
    },
    {
      id: "/dashboard/news",
      label: 'Новости',
      icon: <ProjectFilled />,
      path: 'news',
      component: News
    },
    {
      id: '/dashboard/announce',
      label: 'Объявление',
      icon: <BellFilled />,
      path: 'announce',
      component: Announcement
    }
  ];

  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log(pathname);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout
      className='min-h-[100vh]'
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical py-4" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
        >
          {items.map((item) => (
            <Menu.Item key={item.id} icon={item.icon}>
              <NavLink
                to={item.path}
              >
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
          className='flex justify-between items-center'
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
          {pathname == '/dashboard/trimester'?
            <div className='hidden md:block text-[17px] md:text-[17px] lg:text-[23px] text-[red] text-center '>
              <h2>Руйхати донишчуёне, ки карзи молияви доранд!</h2>
            </div>:
            null
          }
          <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              marginRight: 20, // Add some margin to the right
            }}
          >
            Logout
          </Button>
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
    </Layout >
  );
};

export default Dashboard;