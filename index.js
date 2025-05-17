const express = require('express');
const cors = require ('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// ZsGT69CL6VrNlth8
// T-shirtShop



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zc7c13h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // DB Operations

    const tshirtCollection = client.db('tshirtDB').collection('tshirts')


    // operations ->
    app.get('/tshirts', async(req, res) =>{
      const result = await tshirtCollection.find().toArray();
      console.log(result);
      res.send(result);
    })


    app.post('/tshirts', async(req, res) =>{
      const newTshirt = req.body;
      const result = await tshirtCollection.insertOne(newTshirt);
      res.send(result);
    })


    app.put('/tshirts/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updatedTshirt = req.body;
      const updatedDoc = {
        $set: updatedTshirt
      }

      const result = await tshirtCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })


    app.delete('/tshirts/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await tshirtCollection.deleteOne(query);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('tShirt server is running');
})

app.listen(port, () =>{
    console.log('tShirt server is w8ing.');
})