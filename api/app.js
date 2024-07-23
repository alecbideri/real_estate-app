import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // lib from node express to handle cookie effectively 
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);  // apiRequest fir the auth Route (Login and register and logout)
app.use("/api/test", testRoute); // apiRequest for the test route

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
