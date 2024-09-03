const express = require("express");
const connectDB = require("./configs/db");
const { success, badRequest } = require("./utils/response");
const app = express();

const PORT = process.env.PORT || 8000;

connectDB(); //mongodb connection

app.get("/", (req, res) => success(res, "Hitted Root"));

app.all("*", (req, res) => {
  badRequest(res, "Not found", `404 || ${req.method} > ${req.url} Not Found`);
});

app.listen(PORT, () =>
  console.log(`==> Server(🚀): http://localhost:${PORT} `)
);
