const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
var _ = require("lodash");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/itemDB");

const itemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 40,
  },
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  title: "To buy milk and food",
});

const item2 = new Item({
  title: "To buy eggs and chicken",
});

const defaultItems = [item1, item2];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  const day = date.getDate();
  Item.find({})
    .then((item) => {
      if (item.length === 0) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Success");
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.render("list", { listTitle: day, newListItems: item });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  const day = date.getDate();
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    title: itemName,
  });

  if (listName === day) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .then((foundList) => {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post("/delete", (req, res) => {
  const day = date.getDate();
  const checkItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === day) {
    Item.findByIdAndRemove({ _id: checkItemId })
      .then(() => {
        console.log("Success");
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkItemId } } }
    )
      .then(() => {
        console.log("Succesfully removed an item from Items array");
        res.redirect("/" + listName);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get("/:customListName", (req, res) => {
  const listName = _.capitalize(req.params.customListName);
  const list = new List({
    name: listName,
    items: defaultItems,
  });
  List.findOne({ name: listName })
    .then((foundList) => {
      if (!foundList) {
        list.save();
        res.redirect("/" + listName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
