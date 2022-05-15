const express =require("express");
const dotenv =require("dotenv");
const connectDatabase=require("./helpers/database/connectDatabase");
const customErrorHandler=require("./middlewares/errors/customErrorHandler");
const routers=require("./routers"); 
const bodyParser = require('body-parser');
const cors = require('cors');

const app =express();

app.use(cors());
//Environment Variable
dotenv.config({
    path:"./config/env/config.env"
});

//MongoDb Connection
connectDatabase();

//Express - Body Middleware
app.use(express.json());

const PORT= process.env.PORT;

//Routers Middleware
app.use("/api",routers);
app.use(customErrorHandler);


app.listen(PORT,()=>{
    console.log(`App Started on ${PORT}:${process.env.NODE_ENV}`);
});

