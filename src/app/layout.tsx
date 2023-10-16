"use client";

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
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu, Typography } from "antd";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Title } = Typography;
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<IUser>();
  const { Content, Sider } = Layout;
  const route = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getSessionStorage();
      const accessToken = getTokenFromCookie("token");
      if (!accessToken) {
        route.push("/login");
      }
      return setUser(user || "");
    }
  }, []);

  const handleLogout = () => {
    clearCookie("token");
    clearCookie("refresh_token");
    clearSessionStorage();
    route.push("/login");
  };

  return (
    <html lang="en">
      <body>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ padding: "24px 0", height: "98vh" }}>
            <Sider
              className="sider_container"
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <div className="center_info">
                <Image className="profile_info" src={user?.url_img || ""} />
                <Title
                  level={3}
                  style={{
                    textAlign: "center",
                    marginTop: "0",
                    color: "white",
                  }}
                >
                  {user?.full_name}
                </Title>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: "Profile",
                    onClick: () => route.push("profile"),
                  },
                  {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "Todolist",
                    onClick: () => route.push("todo"),
                  },
                ]}
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
      </body>
    </html>
  );
}
