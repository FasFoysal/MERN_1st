require('dotenv').config()
var express = require('express');
var app = express();
var router = require('./router/router')
require('./../db/userData');
const cookieParser = require("cookie-parser");
var cors = require('cors');

const PORT = process.env.PORT || 5050;

app.use(cors({
    origin:"https://mern-1st.onrender.com"
}))
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT,()=>{
    console.log(`app open port ${PORT}`)
})
