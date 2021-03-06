const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//connect to database 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log("\nconnected to DATABSE")
})
.catch(err => console.log("DB error:",err))


// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
