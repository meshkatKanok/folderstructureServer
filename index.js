const express=require('express')
const app = express()
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port=process.env.port || 5000
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("folderstructure")
})
const uri =`mongodb+srv://${process.env.User_name}:${process.env.User_pass}@cluster0.z9zlqsn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
    try{
        const collection = client.db("folder").collection("structure");
        app.post('/folder',async(req,res)=>{
            const post=req.body
            const allPost=await collection.insertOne(post)
            res.send(allPost)
        
        })
        app.get('/folder',async(req,res)=>{
            const query={}
            const cursor=collection.find(query)
            const alldata=await cursor.toArray()
            res.send(alldata)
       
        })
        app.delete('/folder/:id',async(req,res)=>{
            const id =req.params.id
            const query={_id: new ObjectId(id)}
            const deleteData=await collection.deleteOne(query)
            res.send(deleteData)
        })
    }
    finally{

    }
 }
 run().catch(console.dir)

app.listen(port,()=>{
    console.log(`folderstructure port ${port}`);
})