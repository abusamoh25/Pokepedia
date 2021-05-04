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
    const pokemName = req.body.pokeName.charAt(0).toLowerCase() + req.body.pokeName.slice(1);
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemName;
    const fail = "Pokémon not found, please try a valid Pokémon ID or Name.";

    https.get(url, function (pokemonResponse) {

       if ( pokemonResponse.statusCode !== 200) {
            res.render("failure.ejs", {fail: fail})
        }
        else {

        

            let pokeData = "";
            pokemonResponse.setEncoding("utf8");
            console.log(pokemonResponse.statusCode);

            pokemonResponse.on("data", (data) => {
                pokeData += data;
            })

            pokemonResponse.on("end", () => {
                pokeData = JSON.parse(pokeData);
                var name = pokeData.name;
                var id = pokeData.id;
                const types = pokeData.types;
                const move = pokeData.moves;

                if(id < 10)
                {
                    id = "00" + id;
                }
                else if(id > 10 && id < 100)
                {
                    id = "0" + id;
                }


                const imageSprite = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + id + ".png";

                name = name.charAt(0).toUpperCase() + name.slice(1);

                res.render("pokemon.ejs",{name: name, id: id, imageSprite: imageSprite, types: types, move: move})
            });
        }

    })

})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000")
})
