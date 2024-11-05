const express = require("express");
const path = require("path")
const  {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017";
const dbname = "foodDel";
const client = new MongoClient(url)
const hbs = require('hbs');  

const app = express()
const publicDirectoryPath = path.join(__dirname, "./public");

// Set up view engine and static files
app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
let db;


async function connectDb() {
    try{
        await client.connect();
        db = client.db(dbname)
        console.log("connected to db")
    }catch(error){
        console.error("failed to connect to mongodb")
    }
}
connectDb();

app.get("/register",(req,res)=>{
    res.render('register.hbs')
})
app.get("/login",(req,res)=>{
    res.render('login.hbs')
})
app.post("/submit",async (req,res)=>{
    try{
        console.log(req.body);
        const {name, email, phone, password, street,city,state,pincode,role} = req.body;

        let isExists = await db.collection('Users').find('user');
        if(isExists){console.log("user not found");
        }
        const user = {name,email,phone,password,phone,password,address:{street,city,state,pincode},role};
        await db.collection("Users").insertOne(user);
        res.render('homepage.hbs')
    }
    catch{
        res.render('register.hbs')
        
    }    
    
})
app.post("/submit1",async (req,res)=>{
    try{
        console.log(req.body);
        const {name, email, phone, password, street,city,state,pincode,role} = req.body;

        const user = {name,email,phone,password,phone,password,address:{street,city,state,pincode},role};
        await db.collection("Users").insertOne(user);
        res.render('homepage.hbs')
    }
    catch{
        console.log("error occured");
        
    }    
    
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
    
});









