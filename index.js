import express from "express";
import "dotenv/config";
import cors from "cors";
import { MongoClient } from "mongodb";
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGODB_URI);

//middleware
const app = express();
app.use(cors());
app.use(express.json());

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("hireloop");
const users = db.collection("user");
const jobs = db.collection("jobs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const result = await users.find().toArray();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
