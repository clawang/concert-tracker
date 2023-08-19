import React from 'react';
import {Event} from './App';

interface ConcertProps {
    concert: Event;
}

function Concert({concert}: ConcertProps) {

    const dateToStr = (date: Date): string => {
        return date.toISOString().slice(0,10);
    };

  return (
    <div className="concert-wrapper">
        <div className="concert-date-header">
            <h3><span>{concert.name}</span>{dateToStr(concert.date)}</h3>
        </div>
        <div className="concert-details-wrapper">
            <div className="concert-location-wrapper">
                <p>{concert.venue.name}</p>
                <p>{concert.venue.city}</p>
            </div>
            <p className="rating">{concert.rating + "/5"}</p>
        </div>
    </div>
  );
}

export default Concert;
