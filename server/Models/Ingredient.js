import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: mongoose.Types.ObjectId}
})
export default mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema)
