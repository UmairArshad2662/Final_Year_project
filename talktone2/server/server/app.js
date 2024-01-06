const express = require("express"); //to require thr express
const mongoose = require("mongoose"); // to require or import the mongodb
const bodyParser = require("body-parser");
 const cors = require("cors");

const app = express();
 app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/NEWDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected with mongodb");
  })
  .catch((err) => {
    console.log("Something went WRONG!!!" + err);
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.json());

const UserRoute = require("./Routes/UserRoute")


app.use("/api/operator", UserRoute.OperatorRouter);
app.use("/api/admin", UserRoute.AdminRouter);
app.use("/api/profile", UserRoute.profileRouter);

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
