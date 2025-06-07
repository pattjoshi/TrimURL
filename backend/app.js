import express from "express";

const app = express();

app.listen(400, () => {
  console.log("server is running in http://localhost:400");
});
