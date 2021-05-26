import React, { Fragment } from 'react';
import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  console.log(props);
  return (
    <section className={classes.detail}>
      <img alt={props.title} src={props.image} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
