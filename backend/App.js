const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

// CORS configuration
// top of app.js
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const corsOptions = {
  origin: FRONTEND_URL, // or an array: [FRONTEND_URL, 'http://localhost:3000']
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));  // Update here as well
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

app.use("/",(req, res) => {
  res.send("API is running");
});

app.use("/api/v1/user", user);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);
app.use("/api/v1/order", order);
app.use("/api/v1/shop", shop);
app.use("/api/v1/product", product);
app.use("/api/v1/event", event);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);
app.use("/api/v1/withdraw", withdraw);



// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}













// put this LAST
app.get("/", (req, res) => {
  res.send("API is running");
});





app.use(ErrorHandler);

module.exports = app;
