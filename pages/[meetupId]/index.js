import { MongoClient, ObjectID } from 'mongodb';
import Head from 'next/head';
import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name='description' content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://mirodil:9nZiewIjA2tj8Sr6@cluster0.k5nzf.mongodb.net/meetups?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  const paths = meetups.map((meetup) => ({
    params: {
      meetupId: meetup._id.toString(),
    },
  }));

  client.close();

  console.log('paths', paths);

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://mirodil:9nZiewIjA2tj8Sr6@cluster0.k5nzf.mongodb.net/meetups?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectID(meetupId),
  });

  console.log('selectedMeetup', selectedMeetup);
  console.log('selectedMeetup', typeof selectedMeetup);
  console.log('selectedMeetupId', selectedMeetup._id);
  console.log('meetupId', meetupId);
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        address: selectedMeetup.address,
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
