const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const appRouter = require("./routes/todoRoute.js");
const path = require('path')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join('../todolist/build')))
app.get("*", function(req, res){
  res.sendFile(path.join('../todolist/build/index.html'))
})

mongoose.connect(
  "mongodb+srv://aliGhouri:Alighouri@cluster0.fo9cxyz.mongodb.net/test"
);

app.use('/todo', appRouter)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
