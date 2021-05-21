//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lo = require("lodash");
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://ashwin0200:%40shw1nR%23m@cluster0.grcvo.mongodb.net/blogdb', {
  useNewUrlParser: true
});
var posts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const bpostSchema = {
  title: String,
  content: String
};
const Bpost = mongoose.model("Bpost", bpostSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  posts = Bpost.find({}, function(err, retposts) {
    res.render('home.ejs', {
      homeStartingContent: homeStartingContent,
      posts: retposts
    });
  });

});
app.get("/about", function(req, res) {
  res.render('about.ejs', {
    aboutContent: aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render('contact.ejs', {
    contactContent: contactContent
  });
});
app.get("/compose", function(req, res) {
  res.render('compose.ejs', {
    contactContent: contactContent
  });
});
app.get("/posts/:afterPost", function(req, res) {
  var postid = lo.toLower(req.params.afterPost);
  Bpost.findOne({
      _id: postid
    }, function(err, post) {
      if (!err) {
        res.render('post.ejs', {
          post: post
        });
      }
    });
});
app.post("/compose", function(req, res) {
  var totalpost = {
    posttitle: req.body.posttitle,
    postmainbody: req.body.postbody,
  }
  const bpost = new Bpost ({
    title: req.body.posttitle,
    content: req.body.postbody
  });
  bpost.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
  // posts.push(totalpost);
});

let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started");
});
