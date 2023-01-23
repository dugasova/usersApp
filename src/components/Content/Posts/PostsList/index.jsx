import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { fetchPosts } from  "../../../../features/posts/postsSlice";
import SinglePost from "../SinglePost";
import "./index.css"

const PostsList = () => {
  const numberOfItemsPerPage = 3;
  const { posts } = useSelector((store) => store.posts);
  const { numberOfPosts } = useSelector((store) => store.posts);
  const { numberOfPages } = useSelector((store) => store.posts);
  const { status } = useSelector((store) => store.posts);
  const { error } = useSelector((store) => store.posts);
  let [curPage, setCurPage] = useState(1);
  let [loading, setLoading] = useState(true);

  const dispatch = useDispatch(curPage);
 
  const onPageChange = (event, newPage) => {
    setCurPage(newPage)
    dispatch(fetchPosts([newPage, numberOfItemsPerPage]));
  }
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts([curPage, numberOfItemsPerPage]));
    }

    if (status === "succeeded") {
      setLoading(false)
    }
  }, [status, dispatch]);

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div className="posts_list">

      {posts.map((post,index) => {
        return (
          <SinglePost
            key={post.id + index}
            name={post.name}
            pantone={post.pantone_value}
            year={post.year}
            color={post.color}
            />
            );
          })}
      <Pagination page={curPage} onChange={onPageChange} count={numberOfPages} />
    </div>
  )
};

export default PostsList;