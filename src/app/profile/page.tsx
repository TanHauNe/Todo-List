"use client";

import { IUser } from "@/types/User.type";
import { getSessionStorage, getTokenFromCookie } from "@/utils/cookie";
import { Image, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ButtonComponent } from "@/components";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const page = () => {
  const route = useRouter();
  const [user, setUser] = useState<IUser>();
  const { Title } = Typography;
  const { isLoading } = useSelector((state: RootState) => state.user);

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

  return (
    <div className={styles.container}>
      <Image className={styles.profile_image} src={user?.url_img || ""} />
      <div className={styles.profile_email}>{user?.email}</div>
      <Title style={{ textAlign: "center", margin: "0" }}>
        {user?.full_name}
      </Title>
      <ButtonComponent
        loading={isLoading ? true : false}
        className={styles.profile_button}
        htmlType="submit"
        content="Update profile"
        onClick={() => route.push("/profile/edit")}
      />
    </div>
  );
};

export default page;
