import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://mirodil:9nZiewIjA2tj8Sr6@cluster0.k5nzf.mongodb.net/meetups?retryWrites=true&w=majority',
      { useUnifiedTopology: true }
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    res.status(201).json({ message: 'Meetup insert' });
  }
}

export default handler;
