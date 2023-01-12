const mongoose = require("mongoose")
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";
const dbName = "fruitsDB";

mongoose.connect(uri + "/" + dbName);

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: [1, "From 1 to 10"],
    max: [10, "From 1 to 10"]
  },
  review: String
});

// singular form, and mongoose will create the collection in plural form
const Fruit = mongoose.model("Fruit", fruitSchema);

// const apple = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "blabla!"
// });
//
// apple.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "Best!"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 3,
//   review: "Weird texture."
// });
//
// Fruit.insertMany([kiwi, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

Fruit.updateOne({_id: "63434c2fff7febf81efe839c"}, {name: "Peach"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Updated");
  }
});

Fruit.deleteOne({name:"Peach"}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Deleted");
  }
});

Fruit.deleteMany({name:"John"}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Deleted");
  }
});

















// const client = new MongoClient(uri, {useUnifiedTopology: true});
//
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected Successfully to server");
//
//         const database = client.db('fruitsDB');
//         const fruitsCollection = database.collection('fruits');
//
//         const cursor = fruitsCollection.find({});
//
//         if (cursor.countDocuments === 0) {
//             console.log("No documents found!");
//         }
//
//         // cursor.toArray(function(err, fruits) {
//         //   console.log(fruits);
//         // });
//         await cursor.forEach((fruit) => {
//             console.log(fruit);
//         });
//
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
//
// run().catch(console.dir);
