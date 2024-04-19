import User from "../Models/User.js";
import express from 'express';
import checkAdmin from "../Middlewares/checkAdmin.js";
import Ingredient from "../Models/Ingredient.js";
import Recipe from '../Models/Recipe.js';
import mongoose from "mongoose";
const SecretKey = 'My_Secret_Key';


var router = express.Router();

router.use(checkAdmin);


router.post('/addIngredient', async (req, res) => {
    console.log('add ingredient');
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ msg: 'not a valid ingredient name' });

    let ingredientCheck = await Ingredient.findOne({name: name}).exec();
    if(ingredientCheck)return res.status(409).json({msg: 'already exists'});

    const ingredient = new Ingredient({
        name: name,
        description: description,
    })
    await ingredient.save();

    return res.json(ingredient);
})

router.post('/addRecipe', async (req, res) => {
    console.log('adding recipe');

    const { name, description, ingredients } = req.body;

    if (!name) return res.status(400).json({ msg: 'not a valid recipe name' });
    // if (!ingredients || ingredients.length == 0) return res.status(400).json({ msg: 'no ingredients entered for this recipe' });

    let ingredientCheck = await Recipe.findOne({name: name}).exec();
    if(ingredientCheck)return res.status(409).json({msg: 'already exists'});

    const recipe = new Recipe({
        name: name,
        description: description,
        ingredients: ingredients
    })
    await recipe.save();
    res.json(recipe);
    res.end();
})

router.post('/addIngredientTo/:recipe', async (req, res) => {
    console.log('adding ingredient to recipe');

    const {ingredient} = req.body;
    const {recipe} = req.params;

    if (!recipe || !ingredient) return res.status(400).json({ msg: 'not valid recipe or ingredient id' });

    await Recipe.updateOne(
        { _id: recipe },
        { $addToSet: { ingredients: { $each: [new mongoose.Types.ObjectId(ingredient)] } } }
    )

    res.json({msg: 'done'});

})

export default router