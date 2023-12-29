const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");


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
};

app.set("views", path.join(__dirname, "views/"));
app.set("views engine", "views");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")));


// Root route design
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//  index route  
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// create route
app.post("/listings", async (req, res) => {
  let newlistings = new Listing(req.body.Listing);
  await newlistings.save();
  res.redirect("/listings");
});


// Edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
  res.redirect(`/listings/${id}`);
});

// show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListings = await Listing.findOneAndDelete(id);
  console.log(deletedListings);
  res.redirect("/listings");
});

// server SET
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});


// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing(
//     {
//       title: "Secluded Beach House in Costa Rica",
//       description:
//         "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
//       image:  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//       price: 1800,
//       location: "Costa Rica",
//       country: "Costa Rica",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
//   console.log(sampleListing);
// });