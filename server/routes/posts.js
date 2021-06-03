import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

//It is reached by going to - localhost:5000/posts. Because, we add /post prefix for all routes here.

router.get("/", getPosts);
router.post("/", auth, createPost); // run createPost function
router.patch("/:id", auth, updatePost); //patch is updateing an existing document. We need to know an id before to do something.
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost); ///likePost - just we know this is like post route. Liking something is updating.

export default router;
