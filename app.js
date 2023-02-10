const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const appRouter = require("./routes/todoRoute.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://aliGhouri:Alighouri@cluster0.fo9cxyz.mongodb.net/test"
);

app.use('/todo', appRouter)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
