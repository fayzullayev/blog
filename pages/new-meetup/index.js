import React from 'react';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const addMeetupHandler = async (data) => {
    const respone = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const datas = await respone.json();
    console.log(datas);
  };

  return (
    <>
      <Head>
        <title>Add new Meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
