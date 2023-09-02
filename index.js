import express from "express"
import redis from "redis"
import util from "util"
const redis_url = 'redis://localhost:6379'
const client = redis.createClient(redis_url)

const app = express()
app.use(express.json())

app.post('/',(req,res)=>{
    const {key,value} = req.body
console.log(key,value)
 client.set(key,value,(err,response)=>{

    console.log(response)
    res.send(response)
 })

 })


app.listen(3000,()=>{
    console.log("listen to the port xyxyxyx")
})