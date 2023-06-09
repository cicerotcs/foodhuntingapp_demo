const express = require("express");
require("dotenv").config();
const client = require("./db/connect");
const methodOverride = require("method-override");
const override = require("./middleware/override");
const { getAllDishes } = require("./controllers/dishes");
const dishesRoutes = require("./routes/dishesRoutes");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const { getUser } = require("./middleware/auth");
const MemoryStore = require("memorystore")(session);

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride(override));

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, //hour
  },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use(getUser);

app.get("/", getAllDishes);
app.use("/dishes", dishesRoutes);
app.use("/", authRoutes);

const port = process.env.PORT || 5000;

async function start() {
  try {
    await client.connect();
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
