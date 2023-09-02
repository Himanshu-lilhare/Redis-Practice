import express from "express";
import redis from "redis";
import util from "util";
const redis_url = "redis://localhost:6379";
const client = redis.createClient(redis_url);
client.set = util.promisify(client.set);
const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { key, value } = req.body;
  console.log(key, value);
  const response = await client.set(key, value);

  res.json(response);
});

app.listen(3000, () => {
  console.log("listen to the port xyxyxyx");
});
