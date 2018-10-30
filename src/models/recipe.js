const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: String,
    ingredients: [{
        name: String,
        amount: String
    }],
    instructions: [String]
});

module.exports = mongoose.model('Recipe', RecipeSchema);