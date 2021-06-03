import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"; //this gives us access to a real model

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); //retrieve all posts from DB
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//https://restapitutorial.com/httpstatuscodes.html

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    //changes
    ...post,
    creator: req.userId, //creator is no longer going to be name. We specify it as an ID
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //Extract an id. HOw do we know that we are going to recive this? We set our route /:id. While using object destructuring we can also rename our properties like this: {id: _id}

  const post = req.body; //comes from frontend

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: id`);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true } // so we can recieve updated vesroon of the post
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //1. First we have to see if user is even authenticated. Because of middleware "auth" in our routes we have an access ID of users. It populates the request which means request has userId property.

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id); //we have to find a post by its ID

  //2. We have to see if the user's ID is already in the like section or is it not. We can know by their ID: who liked specific post. We will change in a minute our model regarding Like property.
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // if users ID is not in the above index array
    //like the post
    post.likes.push(req.userId);
  } else {
    //dislake the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const likedPost = await PostMessage.findByIdAndUpdate(
    //update post
    id,
    post, //update the post
    { new: true }
  );

  res.json(likedPost);
};
