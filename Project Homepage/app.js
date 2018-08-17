//****** INITIAL SETUP ******//

var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Gallery    = require("./models/gallery"),
    Comment    = require("./models/comment")
    
mongoose.connect("mongodb://localhost:27017/homepage_db", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//****** ROUTES ******//

app.get("/", function(req, res){
    res.render("landing");
});

// RESTFUL - INDEX

app.get("/gallery", function(req, res){
    Gallery.find({}, function(err, allGaleries){
        if(err){
            console.log(err);
        } else {
            res.render("galleries/index", {gallery:allGaleries});
        }
    });
});

// RESTFUL - CREATE

app.post("/gallery", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newGallery = {name:name, image:image, description:desc};
    Gallery.create(newGallery, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/gallery");
        }
    });
});

// RESTFUL - NEW

app.get("/gallery/new", function(req, res) {
    res.render("galleries/new");
});

// RESTFUL - SHOW

app.get("/gallery/:id", function(req, res){
    Gallery.findById(req.params.id).populate("comments").exec(function(err, foundGallery){
        if(err){
            console.log(err);
        } else {
            res.render("galleries/show", {gallery:foundGallery});
        }
    });
});


//****** COMMENTS ROUTES ******//

// RESTFUL - NEW

app.get("/gallery/:id/comments/new", function(req, res){
    Gallery.findById(req.params.id, function(err, gallery){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {gallery:gallery});
       }
    });
});

// RESTFUL - CREATE

app.post("/galleries/:id/comments", function(req, res){
    Gallery.findById(req.params.id, function(err, gallery){
        if(err) {
            console.log(err);
            res.redirect("/gallery");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   console.log(err);
               } else {
                   gallery.comments.push(comment);
                   gallery.save();
                   res.redirect("/gallery/" + gallery._id);
               }
            });
        }
    });
});

//****** SERVER LISTENING ******//

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Homepage server has started!");
});

