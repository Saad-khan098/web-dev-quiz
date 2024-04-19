import express from 'express';
import mongoose from 'mongoose';
import User from './Models/User.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import recipeRouter from './routes/recipe.js'
import jwt from 'jsonwebtoken'
import parseJwt from './Middlewares/parseJwt.js';
import cors from 'cors';


const SecretKey = 'My_Secret_Key';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


const main = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/quiz")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
await main();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req,res)=>{
    res.send('hello world');
})

app.use('/auth', authRouter)

app.use(parseJwt);

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/recipe', recipeRouter)



app.use((req, res, next) => {
    res.status(404).json({ error: 'URL Not Found' });
    next();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});