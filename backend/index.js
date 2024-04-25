const express = require("express");
const mongoose=require('mongoose')
const rootRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/vi", rootRouter);


app.listen(3001,()=>{
    console.log('Server is running on port 3001')
})

mongoose.connect('MONGO_DB_STRING',{dbName:"Paytm"})
console.log('connected reached')








