import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./src/Routers/AuthRoute.js";
import UserRoute from "./src/Routers/UserRoute.js";
import PostRoute from "./src/Routers/PostRoute.js";
import UploadRoute from "./src/Routers/UploadRoute.js";
import ChatRoute from "./src/Routers/ChatRoute.js";
import MessageRoute from "./src/Routers/MessageRoute.js";

const app = express();

app.use(express.static("src/public"));
app.use("/images", express.static("images"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`listen ${process.env.MONGO_DB}`)
    )
  )
  .catch((error) => console.log(error));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
