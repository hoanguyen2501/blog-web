const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Http Logger
// app.use(morgan("combined"));

// // Templeta engine
const viewPath = "resources/views";
const config = {
  extname: ".hbs",
};

app.engine(".hbs", handlebars.engine(config));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, viewPath));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.post("/search", (req, res) => {
  console.log(req.body);

  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
