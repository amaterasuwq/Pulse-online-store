const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5000;

const uri = "mongodb+srv://MykhailoChuprun:e9c6WJfx3ZTSp9m@cluster0.ofvg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());

app.get('/api/staff', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('pulsestore'); 
    const collection = database.collection('staff');
    const staff = await collection.find({}).toArray();
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching staff data' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});