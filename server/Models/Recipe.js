import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: mongoose.Types.ObjectId}
})
export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema)
