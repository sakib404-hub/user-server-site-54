require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    //creating the Database
    const userManagemnetDB = client.db("userManagemnetDB");
    const userCollection = userManagemnetDB.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      // console.log("Deleting User is Hitted!");
      // res.json({ success: true });
      const id = req.params.id;
      console.log(id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

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
