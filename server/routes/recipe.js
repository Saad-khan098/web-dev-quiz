import User from "../Models/User.js";
import express from 'express';
import Ingredient from "../Models/Ingredient.js";
import Recipe from '../Models/Recipe.js';
const SecretKey = 'My_Secret_Key';

var router = express.Router();

router.use((req,res,next)=>{
    if(!req.user) return res.status(401).json({msg: 'not logged in'});
    console.log(req.user);
    // if(req.user?.role != 'user'){
    //     return res.status(401).json({msg: 'not logged in as user'});
    // }
    next();
})

router.get('/all', async (req,res)=>{
    console.log('getting all recipes');

    const recipes = await Recipe.find({}).exec();
    res.json(recipes);
})
router.get('/ingredients', async (req,res)=>{
    const ingredients = await Ingredient.find().exec();
    res.json(ingredients);
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    if(!id)return res.status(400).json({msg: 'not a valid recipe id'});

    try{
        const recipes = await Recipe.find({_id: id}).populate('ingredients').exec();
        res.json(recipes);
    }
    catch(e){
        console.log(e);
        res.end();
    }
})
export default router