import mongoose from "mongoose";

const db ='mongodb+srv://Chandanchaudhary:TdjWK8MeQWyocbr0@cluster0.ee8lkbd.mongodb.net/AI_Content_Generator';

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    return console.log("Database is already connected");
  }
  if (connectionState === 2) {
    return console.log("Connecting...");
  }
  try {
    await mongoose.connect(db!, {
      bufferCommands: true,
    });
    console.log("connected");
  } catch (err) {
    console.log(err);
  }
};
export default connect;
