const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const mongoose=require('mongoose');
const ejsMate = require('ejs-mate');
const Listing=require('./models/listing.js');//The ./ indicates that models is a subdirectory in the current directory.


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");//tells Express to use EJS as the default view engine for rendering templates.
app.engine("ejs",ejsMate);//registering ejs-mate as the custom rendering engine for .ejs files in your Express application.e replacing the default engine with ejs-mate.which adds extra functionality, such as - Support for layouts, Simplified inheritance between templates.
app.use(express.static(path.join(__dirname,"/public")));//app.use("/images",express.static(path.join(__dirname, "images")));//When you specify /images, you're telling Express to serve static files only when the URL begins with /images.

//establising connection b/w app.js file and MongoDB database
let url="mongodb://127.0.0.1:27017/joyhub";
main().then(res=>{
    console.log("connection estalished successfully");
}).catch(err=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(url);
}
//Root Route
app.get("/",(req,res)=>{
    res.send("root is working");
});
//Index Route
app.get("/listings",async(req,res)=>{
    let allLists = await Listing.find({});
    res.render("listing/index.ejs",{allLists});//  relative path, starting from the directory set as the views folder in your Express app.If you prefix the path with /, like "/listing/index.ejs", it will not work because it tries to find the file at the root of your filesystem, which is incorrect.
});
//Show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    res.render("listing/show.ejs",{listing});
});








app.listen(3000,()=>{
    console.log("app is listening to port 3000");
});