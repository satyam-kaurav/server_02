const express = require("express");
const connectDB = require("./configs/db");
const { success, badRequest } = require("./utils/response");
const { default: mongoose } = require("mongoose");
const logger = require("./middlewares/logger");
const app = express();

const PORT = process.env.PORT || 8000;

connectDB(); //mongodb connection

app.use(express.json()); // parsing req for body

app.use(logger); // logging with route and response type

app.get("/", (req, res) => success(res, "Hitted Root")); // root route

app.use("/user", require("./routes/userRoute"));

app.all("*", (req, res) => badRequest(res, "Route Not Found")); // last hit route

mongoose.connection.once("connected", () => {
  app.listen(PORT, () =>
    console.log(`==> Server(🚀): http://localhost:${PORT} `)
  );
});
