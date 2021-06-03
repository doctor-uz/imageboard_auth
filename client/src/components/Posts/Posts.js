import React from "react";

import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";

import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts); //state is whole global store or state. With this way we are going to get access to global redux store. How do we know it is state-posts -->  "post"? If you go to reducers index.js you can see posts.

  const classes = useStyles();

  console.log(posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((
        post //loop overs the posts
      ) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          {/* item is type of layout of the Grid. XS for mobile devices */}
          <Post post={post} setCurrentId={setCurrentId} />
          {/* We are sending individual value of a post to each post components as props */}
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
