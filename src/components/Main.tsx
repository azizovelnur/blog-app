import React, {FC, useState} from 'react';
import {useFetchCreatePostMutation, useFetchDeletePostMutation, useFetchPostsQuery} from "../store/posts/postsApi";

const Main: FC = () => {


  const [newPost, setNewPost] = useState('')
  const {isLoading, isError, data: postsData} = useFetchPostsQuery(null)
  const [addPost, {isSuccess}] = useFetchCreatePostMutation()
  const [removePost] = useFetchDeletePostMutation()

  console.log(postsData)

  const createPost = async () => {
     await addPost({post: newPost}).unwrap()
    setNewPost('')
  }

  const deletePost = async (_id: number) => {
    console.log(_id)
    await removePost(_id).unwrap()
  }

  return (
    <div className={'mainGrid border-[#000] border-solid border-4'}>


      <div className={'flex justify-center mt-[40px]'}>
        <div className={'border-indigo-900 border-[2px]'}>
          <input value={newPost} onChange={(event) => setNewPost(event.target.value)} className={'rounded-[4px]'}
                 placeholder={'create post'}
                 type="text"/>
          <button onClick={() => createPost()} className={'bg-black text-white'}>Create Post</button>
        </div>

      </div>


      {
        postsData?.map((obj: any, index: number) =>
          <div key={index} className={'w-[400px] h-[100px] border-[2px] border-indigo-900'}>
            <div>{obj.title}</div>
            <div>{obj.text}</div>
            <div>{obj.user.name}</div>
            <button onClick={() => deletePost(obj._id)}>delete</button>
          </div>
        )
      }
    </div>
  );
};

export {Main};