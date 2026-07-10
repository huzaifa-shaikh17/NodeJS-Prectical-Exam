import express from "express";
import envConfig from "./configs/envConfig.js";
import database from "./configs/db.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";

const port = envConfig.PORT || 8081;

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(port, (err) => {
  if (!err) {
    console.log("SERVER STARTED...");
    console.log(`http://localhost:${port}`);
  } else {
    console.log(err.message);
  }
});
