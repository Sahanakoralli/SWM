import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Successfull conntect to db...."))
    .catch((err) => console.log(err));
};

export default connectDB;
