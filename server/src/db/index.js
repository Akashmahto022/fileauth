import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect("mongodb+srv://akashmahto2272003:authfile5060@cluster0.fnrl9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected Successfully", connectionInstance.connection.host);
  } catch (error) {
    console.log("Error in connected with MongoDB", error);
  }
};

export default connectDB;