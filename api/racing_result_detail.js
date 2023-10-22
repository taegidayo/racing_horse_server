import { MongoClient } from "mongodb";
import "dotenv/config";

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL);

  const param = req.query;

  const database = client.db("project_hr");
  const col = database.collection("racing_result");

  const result = await col
    .find({
      rcNo: parseInt(param.rcNo),
      meet: param.meet,
      rcDate: parseInt(param.date),
    })
    .toArray();

  client.close();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // console.log(param.time)

  // if (result) {
  res.status(200).send(result);
  // } else {
  // res.status(200).send({ dd: "bye" });
  // }
};
