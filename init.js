import "./db";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT;
const HOSTNAME = "127.0.0.1";
const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);
app.listen(PORT, HOSTNAME, handleListening);
