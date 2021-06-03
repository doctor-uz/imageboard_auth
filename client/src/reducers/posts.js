/* eslint-disable import/no-anonymous-default-export */

import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload]; //we have an array of the posts. 1st spread all posts, then add new post which is stored in action.payload
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      ); //since output of map() is new array we will use it. The posts array will be changing something in there and we will return changed array. action.paylod is newly updated post
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload); //we are going to return all posts, but first we are going to filter out that one we are going to delete.
    default:
      return posts;
  }
};
