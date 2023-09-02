import axios from "axios";
import express from "express";
import redis from "redis";
import util from "util";
const redis_url = "redis://localhost:6379";
const client = redis.createClient(redis_url);
client.set = util.promisify(client.set);
client.get = util.promisify(client.get);
const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { key, value } = req.body;
  console.log(key, value);
  const response = await client.set(key, value);

  res.json(response);
});

app.get("/", async (req, res) => {
  const data = await client.get(req.body.key);
  res.json(data);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const cachedPost = await client.get(`post-${id}`)
  if(cachedPost){
   return res.json(JSON.parse(cachedPost))
  }else{
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
 await client.set(`post-${id}`,JSON.stringify(data))
   res.json(data)
  }


});

app.listen(3000, () => {
  console.log("listen to the port xyxyxyx");
});
