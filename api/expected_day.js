module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL);

  const database = client.db("project_hr");
  const col = database.collection(coll_name[type]);

  var result = await col.find({}).toArray();
  //   console.log(result);

  res.status(200).send(result);
  //   return result;

  res.status(200).send("Hello, World!");
};
