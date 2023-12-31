const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware 
app.use(cors());
app.use(express.json());


// MongoDB start

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0iwmvh7.mongodb.net/?retryWrites=true&w=majority`;

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
        client.connect();

        const fresherJobsCollection = client.db("jobPortal").collection("fresherJobs");
        const experiencedJobsCollection = client.db("jobPortal").collection("experiencedJobs");
        const topItCompanyBDCollection = client.db("jobPortal").collection("topItCompanyBD");
        const topItCompanyWorldCollection = client.db("jobPortal").collection("topItCompanyWorld");



        // fresherJobs related apis 
        app.get('/fresherJobs', async (req, res) => {
            const result = await fresherJobsCollection.find().toArray();
            res.send(result);
        })

        app.post('/fresherJobs', async (req, res) => {
            const freshJob = req.body;
            console.log(freshJob);
            const result = await fresherJobsCollection.insertOne(freshJob);
            res.send(result);
        })
        

        // experiencedJobs related apis 
        app.get('/experiencedJobs', async (req, res) => {
            const result = await experiencedJobsCollection.find().toArray();
            res.send(result);
        })

        app.post('/experiencedJobs', async (req, res) => {
            const expertJob = req.body;
            console.log(expertJob);
            const result = await experiencedJobsCollection.insertOne(expertJob);
            res.send(result);
        })


        // topItCompanyBD related apis 
        app.get('/topItCompanyBD', async (req, res) => {
            const result = await topItCompanyBDCollection.find().toArray();
            res.send(result);
        })

        // topItCompanyWorld related apis 
        app.get('/topItCompanyWorld', async (req, res) => {
            const result = await topItCompanyWorldCollection.find().toArray();
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

// MongoDB end


app.get('/', (req, res) => {
    res.send('Doctor Portal Is Running')
})

app.listen(port, () => {
    console.log(`Doctor portal running on port ${port}`)
})