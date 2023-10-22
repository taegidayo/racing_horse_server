import { MongoClient } from "mongodb";
import "dotenv/config";

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL);

  const database = client.db("project_hr");
  const col = database.collection("expected_racing_summary");

  // hrName 필드의 모든 고유한 값을 가져옵니다.
  const distinctHrNames = await col.distinct("hrName");

  // console.log(distinctHrNames);

  client.close();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send(distinctHrNames);
};
