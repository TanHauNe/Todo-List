"use client";

import { path } from "@/configs/path";
import { Providers } from "@/redux/provider";
import { IUser } from "@/types/User.type";
import {
  clearCookie,
  clearSessionStorage,
  getSessionStorage,
  getTokenFromCookie,
} from "@/utils/cookie";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Image, Layout, Menu, Typography } from "antd";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Title } = Typography;
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<IUser>();
  const { Content, Sider } = Layout;
  const route = useRouter();
  const arrayItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => route.push(path.profile),
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Todolist",
      onClick: () => route.push(path.todo),
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getSessionStorage();
      const accessToken = getTokenFromCookie("token");
      if (!accessToken) {
        route.push(path.login);
      }
      return setUser(user ?? "");
    }
  }, []);

  const handleLogout = () => {
    clearCookie("token");
    clearCookie("refresh_token");
    clearSessionStorage();
    route.push(path.login);
  };

  return (
    <Content
      style={{
        padding: "0",
        width: "100%",
      }}
    >
      <Layout style={{ padding: "0", height: "98vh", width: "100%" }}>
        <Sider
          className="sider_container"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="center_info">
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ color: "white" }} />
                ) : (
                  <MenuFoldOutlined style={{ color: "white" }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            />
          </div>
          <div className="center_info">
            <Image className="profile_info" src={user?.url_img ?? ""} />
            <Title
              level={3}
              style={{
                textAlign: "center",
                marginTop: "0",
                color: "white",
              }}
            >
              {user?.full_name ?? ""}
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={arrayItems}
          />
          <div className="center_info">
            <div
              onClick={handleLogout}
              className={clsx("circle_button", "logout_button")}
            >
              <LogoutOutlined />
            </div>
          </div>
        </Sider>
        <Content>
          <Providers>{children}</Providers>
        </Content>
      </Layout>
    </Content>
  );
}
