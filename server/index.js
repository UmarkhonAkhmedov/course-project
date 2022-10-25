import express from "express";
import cors from "cors";
import userRoutes from "./routes/routes.users.js";
import collectionsRoutes from "./routes/routes.collections.js";
import itemRoutes from "./routes/routes.items.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/collections", collectionsRoutes);
app.use("/items", itemRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port: 8000`));
