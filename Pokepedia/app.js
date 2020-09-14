//jshint esversion: 6
const ejs = require("ejs")
const request = require("request");
const https = require("https");
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path");
const { response } = require("express");



const app = express();

app.set('view engine', 'ejs');

app.use("/static", express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {

    res.render("home.ejs");



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
    console.log(req.body)
    const url = "https://pokeapi.co/api/v2/pokemon/" + req.body.pokeName;

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

            res.render("pokemon.ejs",{name: name, id: id, imageSprite: imageSprite, types: types})
        });


    })

})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000")
})
