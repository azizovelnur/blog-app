import React, { FC, useState } from "react";
import {
  useFetchCreatePostMutation,
  useFetchDeletePostMutation,
  useFetchPostsQuery,
} from "../store/rtk/posts/postsApi";
import { TCreatePost, IPost } from "../models/models";
import { useSelector } from "react-redux";
import { data } from "../store/async/login/loginSlice";

import { isAuthSelector } from "../store/async/login/loginSlice";

const Main: FC = () => {
  const [newPost, setNewPost] = useState<TCreatePost>({
    title: "",
    text: "",
  });

  const { isLoading, isError, data: postsData } = useFetchPostsQuery(null);
  const [addPost, { isSuccess }] = useFetchCreatePostMutation();
  const [removePost] = useFetchDeletePostMutation();
  const userData = useSelector(data);
  const isAuth = useSelector(isAuthSelector);

  const createPost = async () => {
    await addPost({ ...newPost }).unwrap();
    setNewPost({ title: "", text: "" });
  };

  const deletePost = async (_id: string) => {
    console.log(_id);
    await removePost(_id).unwrap();
  };

  const changeHandler = (e: any) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={"mainGrid border-[#000] border-solid border-4"}>
      <div className={"flex justify-center mt-[40px]"}>
        {isAuth && (
          <div className={"border-indigo-900 border-[2px]"}>
            <input
              value={newPost.title}
              name={"title"}
              onChange={changeHandler}
              className={"rounded-[4px]"}
              placeholder={"title"}
              type="text"
            />
            <input
              value={newPost.text}
              name={"text"}
              onChange={changeHandler}
              className={"rounded-[4px]"}
              placeholder={"text"}
              type="text"
            />
            <button
              onClick={() => createPost()}
              className={"bg-black text-white"}
            >
              Create Post
            </button>
          </div>
        )}
      </div>

      {postsData?.map((obj: IPost, index: number) => (
        <div
          key={index}
          className={"w-[400px] h-[100px] border-[2px] border-indigo-900"}
        >
          <div>{obj.title}</div>
          <div>{obj.text}</div>
          <div>{obj.user.name}</div>

          {obj.user._id === userData?._id && (
            <button onClick={() => deletePost(obj._id)}>delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export { Main };
