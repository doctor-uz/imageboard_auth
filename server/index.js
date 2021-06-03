import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express(); // Initialize this app
dotenv.config();

//General setup
app.use(express.json({ limit: "30mb", extended: true })); // 30 mb is limit of imge size
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes); //evry route inside postRoutes is gonna start with /posts

app.use("/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello to Imageboard.");
// });

//MongoDB - https://www.mongodb.com/cloud/atlas
// const CONNECTION_URL =
//   "mongodb+srv://dilshodDCI:dilshodDCI123@cluster0.ldws3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Add server port
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // options to avoid warnings
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false); // Avoid to get any warnings
