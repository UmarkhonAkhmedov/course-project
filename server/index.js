import express from "express";
import cors from "cors";
import userRoutes from "./routes/routes.users.js";
import collectionsRoutes from "./routes/routes.collections.js";
import itemRoutes from "./routes/routes.items.js";
import commentRoutes from "./routes/routes.comments.js";
import likeRoutes from "./routes/routes.like.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/collections", collectionsRoutes);
app.use("/items", itemRoutes);
app.use("/comments", commentRoutes);
app.use("/like", likeRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port: 8000`));
