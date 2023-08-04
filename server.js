require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Handle connection error, possibly exit the application
  }
}

connectToDatabase();
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected successfully to database"));

app.use(express.json());
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
//   });

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(8080, () => console.log("Listening on port 8080"));
