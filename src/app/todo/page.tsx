"use client";

import { ButtonComponent, InputComponent, PostItem } from "@/components";
import { deletePost, getPostList, setSuccess } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { ISearchParams } from "@/types/Post.type";
import {
  clearCookie,
  clearSessionStorage,
  getTokenFromCookie,
} from "@/utils/cookie";
import { LogoutOutlined } from "@ant-design/icons";
import { Form, Pagination, PaginationProps } from "antd";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Loading from "../loading";
import styles from "./page.module.css";

const List = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { postList, total, isLoading } = useSelector(
    (state: RootState) => state.blog
  );

  const dispatch = useAppDispatch();
  const route = useRouter();

  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limited === "string"
      ? Number(searchParams.limited)
      : 12;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const form = useForm<ISearchParams>({
    defaultValues: {
      key_search: search,
      page: page,
      limited: limit,
    },
    mode: "all",
  });

  const { control, handleSubmit, watch } = form;

  useEffect(() => {
    const searchData = {
      key_search: search,
      page: page,
      limited: limit,
    };

    if (typeof window !== "undefined") {
      const accessToken = getTokenFromCookie("token");
      if (!accessToken) {
        route.push("/login");
      }
    }

    dispatch(getPostList(searchData));
  }, [page, search]);

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const handleStartEditPost = (postId: string) => {
    dispatch(setSuccess());
    route.replace(`todo/${postId}`);
  };

  const handleCreate = () => {
    route.push("create");
  };

  const handleLogout = () => {
    clearCookie("token");
    clearCookie("refresh_token");
    clearSessionStorage();
    route.push("/login");
  };

  const onSubmit = (data: ISearchParams) => {
    route.push(`/todo?search=${data.key_search}&page=1`);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    const searchParam = watch("key_search");
    route.push(`/todo?search=${searchParam}&page=${page}`);
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.search_form}
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
      >
        <InputComponent
          className={styles.search_input}
          name="key_search"
          control={control}
        />

        <ButtonComponent
          loading={isLoading ? true : false}
          htmlType="submit"
          className={styles.search_button}
          content="Search"
        />
      </Form>
      <Suspense fallback={<Loading />}>
        <div className={styles.list_container}>
          {postList.map((post) => (
            <PostItem
              post={post}
              key={post?._id}
              handleDelete={handleDelete}
              handleStartEditPost={handleStartEditPost}
            />
          ))}
        </div>
      </Suspense>
      <div
        onClick={handleLogout}
        className={clsx(styles.circle_button, styles.logout_button)}
      >
        <LogoutOutlined />
      </div>
      <div
        onClick={handleCreate}
        className={clsx(styles.circle_button, styles.create_button)}
      >
        +
      </div>
      <Pagination current={page} onChange={onChange} total={total} />
    </div>
  );
};

export default List;
