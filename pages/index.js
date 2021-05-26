import { MongoClient } from 'mongodb';
import Head from 'next/head';
import React from 'react';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetupss</title>
        <meta
          name='description'
          content='Browse a huge list of highly React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://mirodil:9nZiewIjA2tj8Sr6@cluster0.k5nzf.mongodb.net/meetups?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
