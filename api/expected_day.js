import { MongoClient } from "mongodb";
import "dotenv/config";

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL);

  const database = client.db("project_hr");
  const result = await database
    .collection("expected_racing")
    .distinct("rcDate");

  client.close();
  res.status(200).send(result);
};
