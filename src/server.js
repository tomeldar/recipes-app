// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipes'); // connect to our database
const Recipe = require('./models/recipe');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// on routes that end in /recipes
// ----------------------------------------------------
router.route('/recipes')
    .post(function (req, res) {  // create a recipe
        let recipe = new Recipe();
        recipe.name = req.body.name;  // set recipe name

        // save the recipe
        recipe.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: `Recipe created: ${req.body.name}`});
        });
    })

    .get(function (req, res) {
        Recipe.find(function (err, recipes) {
            if (err)
                res.send(err);
            res.json(recipes)
        });
    });

// on routes that end in /recipes/:recipe_id
// ----------------------------------------------------
router.route('/recipes/:recipe_id')
    .get(function (req, res) {
        Recipe.findById(req.params.recipe_id, function (err, recipe) {
            if (err)
                res.send(err);
            res.json(recipe);
        });
    })

    .put(function (req, res) {
        Recipe.findById(req.params.recipe_id, function (err, recipe) {
            if (err)
                res.send(err);

            const prevName = recipe.name;
            recipe.name = req.body.name;

            recipe.save(function (err) {
                if(err)
                    res.send(err);

                res.json({ message: `Recipe name updated: ${prevName} to ${recipe.name}` })
            })
        })
    })

    .delete(function(req,res) {
        Recipe.remove({
            _id: req.params.recipe_id
        }, function(err, recipe) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);