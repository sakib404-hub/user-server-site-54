require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5010;

app.use(cors());
app.use(express.json());

// userName  : userManagemnet
// password: T8YDF2s316qmXSVH;
// const uri =
//   "mongodb+srv://userManagemnet:T8YDF2s316qmXSVH@crud-operation.iftbw43.mongodb.net/?appName=CRUD-operation";
const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // trying to connect with the mongoDB
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged the Deployment!Successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hellow From the server Api!");
});

app.listen(port, () => {
  console.log("This App is listening from port number :", port);
});
