import express from "express";
import cors from "cors";
import connection from "./db/connect.js";

connection();

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port: 8080`));
