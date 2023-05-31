import {Express} from "express";
import {userRoute} from "./routes/users";
import {authRoute} from "./routes/auth";
import {articlesRoute} from "./routes/articles";
import {authValidation} from "./middleware/authMiddleware"
import mongoose from "mongoose";

const PORT:number = 8080
const uri:string = "mongodb+srv://kaswanjitendra8998:k6zOQA6EqV9al6uM@cluster0.r3ulxmu.mongodb.net/sploot?retryWrites=true&w=majority"

const express = require('express');
const app:Express = express()

// ============= CONNECT TO DB ============
mongoose.connect(
    uri,
    {}
)
    .then(()=>console.log('connected to mongodb successfully'))
    .catch(e=>console.log(e));


// ============ APP BODY PARSER AND LOGGER ============ (we can move logger to a middleware)
app.use(express.json());
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

// ================ API ROUTES =============
app.use('/api', authRoute);
app.use('/api',authValidation, articlesRoute);
app.use('/api', userRoute);

//  =============== START SERVER ===========
app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})