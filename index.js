import express from "express"
import redis from "redis"
const redis_url = 'redis://localhost:6379'
const client = redis.createClient(redis_url)

const app = express()

app.listen(3000,()=>{
    console.log("listen to the port xyxyxyx")
})