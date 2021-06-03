import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api";

//we can use fetchPosts function from api/index.js like this: api.fetchPosts

//Action creators - these are functions that returns functions

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); //immediatly to destructure and getting data from backendthe data. Data is represents posts

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const createPost = (post) => async (dispatch) => {
//   //dispatch comes from Redux-thunk
//   try {
//     const { data } = await api.createPost(post); //we destructure the data from the response. This is a POST api request to our backend server and we are sending a post right there.

//     dispatch({ type: "CREATE", payload: data }); //dispatch an action
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export function createPost(post) {
  return async function (dispatch) {
    const { data } = await api.createPost(post); //we destructure the data from the response. This is a POST api request to our backend server and we are sending a post right there.

    dispatch({ type: CREATE, payload: data }); //dispatch an action
  };
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); //api request to updating the post. It returns updated post.

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id); // we do not need to pass any data. We do not interested to return a data.

    dispatch({ type: DELETE, payload: id }); //
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
