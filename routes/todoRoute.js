import Todo from '../models/todo.js'
import express from "express";
import cors from 'cors'
const appRouter = express.Router();

appRouter.post("/addItem", cors(), async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const exists = await Todo.findOne({ item: req.body.item });
  console.log("Query Result.... ", exists);
  if (exists) {
    res.send({ message: "Item already Exists" });
  } else {
    const newItem = new Todo({
      item: req.body.item,
      create: req.body.create,
      comp: req.body.comp,
      status: req.body.status,
    });
    newItem.save(async (err, data) => {
      console.log(err, data);
      if (err) res.send({ err: "Error" });
      else {
        res.send({ message: "Added Successfully" });
      }
    });
  }
});

appRouter.get("/getItems", cors(), async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "*");
  const items = await Todo.find({});
  if (items.length > 0) {
    console.log(items);
    res.send(items);
  } else {
    res.send({ message: "Not found" });
  }
});

appRouter.put("/updateItem/:item/:time", cors(), async (req, res) => {
  console.log(req.params);
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "*");
  const items = await Todo.findOneAndUpdate(
    { item: req.params.item },
    { $set: { comp: req.params.time, status: "completed" } }
  );
  if (items) {
    console.log("updated");
    res.send({success: 'updated'});
  } else {
    res.send({ message: "Not found" });
  }
});

appRouter.delete("/deleteItem/:item", cors(), async (req, res) => {
    console.log(req.params);
    res.set("Access-Control-Allow-Origin", "*");
    const items = await Todo.findOneAndDelete(
      { item: req.params.item },
    );
    if (items) {
      console.log("deleted");
      res.send({message: 'deleted'});
    } else {
      res.send({ err: "Not found" });
    }
  });

  export default appRouter
