//****** SETUP ******//

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//****** TEMPORARY DATA ******//

var gallery = [
        {name: "Oil painting style", image: "https://t00.deviantart.net/h71ZQm03YN1_I_csrny9_j8L-Ts=/fit-in/500x250/filters:fixed_height(100,100):origin()/pre00/6062/th/pre/f/2018/206/7/d/countryside_with_cattle_by_nosterion-dci8k4a.jpg"},
        {name: "Colored pencil style", image: "https://t00.deviantart.net/22VenGfFMJ8LzAMS58xDg3eULhs=/fit-in/500x250/filters:fixed_height(100,100):origin()/pre00/4b06/th/pre/f/2018/206/3/7/church_with_iron_gates_by_nosterion-dci8hhf.jpg"},
        {name: "Cartoon style", image: "https://t00.deviantart.net/iGUh_F8xq1oH-COkpHeSV0IdAfo=/fit-in/500x250/filters:fixed_height(100,100):origin()/pre00/8ed9/th/pre/f/2018/213/1/8/lost_in_the_city___cartoon_version_by_nosterion-dcivqek.jpg"}
    ]

//****** ROUTES ******//

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/gallery", function(req, res){
    res.render("gallery", {gallery:gallery});
});

app.post("/gallery", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newGallery = {name:name, image:image};
    gallery.push(newGallery);
    res.redirect("/gallery");
});

app.get("/gallery/new", function(req, res) {
    res.render("new.ejs");
});

//****** SERVER LISTENING ******//

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Homepage server has started!");
});

