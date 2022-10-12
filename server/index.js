import express from "express";
import cors from "cors";
import connection from "./db/connect.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.create({
    data: {
      title: "My First post",
      body: "My first post body",
    },
  });
  console.log(post);
}
main();
connection();

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port: 8080`));
