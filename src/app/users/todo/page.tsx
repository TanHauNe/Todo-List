"use client";

import { ButtonComponent, InputComponent, PostItem } from "@/components";
import { deletePost, getPostList, setClearState } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { ISearchParams } from "@/types/Post.type";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Pagination, PaginationProps } from "antd";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import { path } from "@/configs/path";

const List = ({
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
      key_search: search ?? "",
      page: page ?? 1,
      limited: limit ?? 12,
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

    dispatch(getPostList(searchData));
  }, [page, search]);

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId)).then(() => {
      dispatch(setClearState());
    });
  };

  const handleStartEditPost = (postId: string) => {
    dispatch(setClearState());
    route.push(`${path.todo}/${postId}`);
  };

  const handleCreate = () => {
    route.push(path.create);
  };

  const onSubmit = (data: ISearchParams) => {
    route.push(`/users/todo?search=${data.key_search}`);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    const searchParam = watch("key_search");
    route.push(`/users/todo?search=${searchParam}&page=${page}`);
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
          loading={isLoading}
          htmlType="submit"
          className={styles.search_button}
          content="Search"
        />
      </Form>
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
      <div
        onClick={handleCreate}
        className={clsx(styles.circle_button, styles.create_button)}
      >
        <PlusOutlined />
      </div>
      <Pagination
        className={styles.paginate_group}
        current={page}
        onChange={onChange}
        total={total}
      />
    </div>
  );
};

export default List;
