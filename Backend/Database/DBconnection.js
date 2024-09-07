import mongoose from "mongoose";

const DBconnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DATABASE_NAME,
    })
    .then(() => console.log("connected to database"))
    .catch((error) => {
      console.log(`Some error occurred for database: ${error}`);
      process.exit(1);
    });
};

export default DBconnection;
