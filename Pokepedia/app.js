//jshint esversion: 6
// require("dotenv").config()
const request = require("request");
const https = require("https");
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path");
// const ejs = require("ejs")
// const mongoose = require("mongoose")
// const session = require("express-session")
// const passport = require("passport")
// const passportLocalMongoose = require("passport-local-mongoose");
const { response } = require("express");

const app = express();

app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



// app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
// }))

// app.use(passport.initialize())
// app.use(passport.session())

// mongoose.connect(
//     `mongodb+srv://EricNwagwu:${process.env.DB_PASS}@cluster0-ogxz8.mongodb.net/pokemonDB`,
//     { useNewUrlParser: true, useUnifiedTopology: true }
// )
// mongoose.set("useCreateIndex", true);

// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     favoritePokemon: [String], 
// })

// userSchema.plugin(passportLocalMongoose)

// const User = new mongoose.model("User", userSchema)

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// app.get("/", function (req, res) {
//     res.render("home")
// })

// app.get("/register",function(req,res){
//     res.render("register")
// })

// app.get("/login",function(req,res){
//     res.render("login")
// })

app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname , "/index.html"));
    
    
    
    //document.write(pokedex.id(1).get());

    //const pokeData = JSON.parse(pokedex);
    
    // for(var i = 1; i <= 893; i++)
    // {
    //     var name =  pokedex.id(i).get();
    //     //name = name.name;
    //     console.log(name + "\n");
    // }

});

app.post("/pokemon", function (req, res) {
    const url = "https://pokeapi.co/api/v2/pokemon/"+req.body.pokeName;

    https.get(url, function (pokemonResponse) {
        let pokeData = "";
        pokemonResponse.setEncoding("utf8");
        console.log(pokemonResponse.statusCode);

        pokemonResponse.on("data", (data) => {
            pokeData += data;
        })

        pokemonResponse.on("end", () => {
            pokeData = JSON.parse(pokeData);
            var name = pokeData.name;
            const id = pokeData.id;
            const types = pokeData.types;


            const imageSprite = pokeData.sprites.front_default;
            

            name = name.charAt(0).toUpperCase() + name.slice(1);

            

            res.write("<h1>" + name + "</h1>");
            res.write("<p>" + id + "</p>");
            res.write(`<img src= " ${imageSprite} ">`);
            types.forEach(function (obj) {
                res.write("<p>" + obj.type.name + "</p>")
            })

            res.send()
        });


    })

})


// app.post("/register", function (req, res) {
//     User.register({ username: req.body.username }, req.body.password, function (err, user) {
//         if (err) {
//             console.log(err)
//             res.redirect("/register")
//         } else {
//             passport.authenticate("local")(req, res, function () {
//                 user.favoritePokemon = []
//                 user.save()
//                 res.redirect("/favorite")
//             });
//         }
//     })
// })



// app.post("/login", function (req, res) {
//     const user = new User({
//         username: req.body.username,
//         password: req.body.password
//     })

//     req.login(user, function (err) {
//         if (err) {
//             console.log(err)
//             res.redirect("/login")
//         } else {
//             passport.authenticate("local")(req, res, function () {
//                 res.redirect("/favorite")
//                 user.favoritePokemon
//             })
//         }
//     })
// })


// app.get("/favorite",function(req,res){
//     if (req.isAuthenticated()) {
//         res.render("favorite",{currentUser: req.user})
//     } else {
//         res.redirect("/login")
//     }
// })

// app.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/");
// })

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000")
})
