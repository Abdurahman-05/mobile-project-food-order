import express, { json } from 'express'
import authController from './controller/auth.controller.js';
import connectDB from './config/db.config.js';
import mongoose from 'mongoose'

const app = express();
const port = process.env.PORT || 3000;

connectDB()
app.use(express.json());


app.post('/signup',authController.registerController);

mongoose.connection.once("open",() => {

  app.listen(port, ()=>{
    console.log(`server connected in port ${port}`);
    
  })
})