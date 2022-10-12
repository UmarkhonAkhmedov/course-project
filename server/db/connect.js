import mongoose from "mongoose";

export default function connection() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(
      "mongodb+srv://umar009:qwerty12345@cluster0.ppwyrue.mongodb.net/?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to databse!");
  }
}
