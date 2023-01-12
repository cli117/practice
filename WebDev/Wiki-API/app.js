//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://cli117:bugaosuni@cluster0.jrylmtu.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'wikiDB'
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        res.send("Article Saved");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("Articles deleted");
      } else {
        res.send(err);
      }
    })
  });

app.route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found!");
      }
    });
  })
  .put(function(req, res) {
    Article.replaceOne({
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      },
      function(err) {
        if (!err) {
          res.send("Successfully replaced")
        } else {
          console.log(err);
        }
      })
  })
  .patch(function(req, res){
    Article.updateOne({
        title: req.params.articleTitle
      },
      {
        $set: req.body
      },
      function(err) {
        if (!err) {
          res.send("Successfully updated")
        } else {
          console.log(err);
        }
      }
    )
  })
  .delete(function(req, res){
    Article.deleteOne({title: req.params.articleTitle}, function(err) {
      if (!err) {
        res.send("Successfully deleted")
      } else {
        console.log(err);
      }
    })
  });
// app.get("/articles", function(req, res){
//   Article.find({}, function(err, foundArticles){
//     if (!err){
//       res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// });
//
// app.post("/articles", function(req,res){
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//
//   newArticle.save(function(err){
//     if (!err){
//       res.send("Article Saved");
//     } else {
//       res.send(err);
//     }
//   });
// });
//
// app.delete("/articles", function(req,res){
//   Article.deleteMany({}, function(err){
//     if (!err){
//       res.send("Articles deleted");
//     } else {
//       res.send(err);
//     }
//   })
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
