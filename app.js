const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path")


// Mongo DB url
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


// main function
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("views engine","ejs");
app.set("views",path.join(__dirname));


// Root route design
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});



// show all listings
app.get("/listings",async (req,res)=>{
  const sampleListing = Listing.find({});
  console.log(sampleListing);
  res.render("/listings/index.ejs");

});



// server SET
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});




// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
//   console.log(sampleListing);
// });