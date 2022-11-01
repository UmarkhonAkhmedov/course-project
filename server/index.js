import express from "express";
import cors from "cors";
import userRoutes from "./routes/routes.users.js";
import collectionsRoutes from "./routes/routes.collections.js";
import itemRoutes from "./routes/routes.items.js";
import commentRoutes from "./routes/routes.comments.js";
import likeRoutes from "./routes/routes.like.js";
import cookieParser from "cookie-parser";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/collections", collectionsRoutes);
app.use("/items", itemRoutes);
app.use("/comments", commentRoutes);
app.use("/like", likeRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Listening on port: 8000`));
