import { MongoClient } from "mongodb";
import "dotenv/config";

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL);

  const database = client.db("project_hr");
  const col = database.collection("expected_racing_summary");

  const results = await col
    .aggregate([
      {
        $group: {
          _id: {
            date: "$rcDate",
            day: "$rcDay",
          },
        },
      },
    ])
    .toArray();

  // 결과에서 데이터를 추출
  const distinctValues = results.map((item) => ({
    rcDate: item._id.rcDate,
    rcDay: item._id.rcDay,
  }));

  client.close();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send(distinctValues);
};
