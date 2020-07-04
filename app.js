const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
const {
  MONGO_URL
} = require("./configs/key");

const authRoute = require('./routes/auth.route');
const postRoute = require('./routes/post.route');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connectd to mongo successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("Connected to mongo fail", err);
});

app.use(express.json());
app.use(authRoute);
app.use(postRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});