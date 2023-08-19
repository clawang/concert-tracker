import React, { useState, useEffect } from 'react';
import { useClassicState } from './hooks';
import Concert from './Concert';
import Input from './Input';
import ArtistPage from './ArtistPage';
import VenuePage from './VenuePage';
import './App.scss';

export type AppState = {
  events: Array<Event>;
  artists: Array<Artist>;
  venues: Array<Venue>;
};

const pages = ['Shows', 'Artists', 'Venues'];

export function App() {
  const [state, setState] = useClassicState<AppState>({
    events: new Array<Event>(),
    artists: new Array<Artist>(),
    venues: new Array<Venue>(),
  });
  const [page, setPage] = useState(0);

  useEffect(() => {
    csvJSON();
  }, [setState]);

  const csvJSON = () => {
    fetch('./shows.csv')
      .then(response => response.text())
      .then(transform);
  }

  console.log(state);

  const transform = (str: string) => {
    let data = str.split('\n').map(i => i.split(','));
    let headers = data.shift();
    let newEvents = new Array<Event>();
    let newArtists = new Array<Artist>();
    let newVenues = new Array<Venue>();
    data.forEach(show => {
      const name = show[1];
      const venueName = show[2];
      let indexOfVenue = newVenues.findIndex(venue => venue.name === venueName);
      if (indexOfVenue < 0) {
        newVenues.push(new Venue(venueName, show[3]));
        indexOfVenue = newVenues.length - 1;
      } else {
        newVenues[indexOfVenue].numShows++;
      }
      newEvents.push(new Event(name, new Date(show[0]), newVenues[indexOfVenue], Number(show[4])));
      const indexOfArtist = newArtists.findIndex(artist => artist.name === name);
      if (indexOfArtist < 0) {
        newArtists.push(new Artist(name));
      } else {
        newArtists[indexOfArtist].numShows++;
      }
    });
    setState({
      events: newEvents.sort((a: Event, b: Event) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }), artists: newArtists, venues: newVenues
    });
  }

  const handleInputSubmit = (date: Date, name: string, venueName: string, venueCity: string, rating: number) => {
    console.log(`${date},${name},${venueName},${venueCity},${rating}`);
    const currEvent = new Event(name, new Date(date), new Venue(venueName, venueCity), rating);
    let newEvents = [...state.events, currEvent];
    setState({
      events: newEvents.sort((a: Event, b: Event) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
    });
  }

  const renderPage = () => {
    if (page === 0) {
      return (<div>
        <div className="form-wrapper">
          <h2>Add a show</h2>
          <Input handleInputSubmit={handleInputSubmit} />
        </div>
        <div className="concerts-container">
          {state.events.map(event => <Concert concert={event} />)}
        </div>
      </div>);
    } else if (page === 1) {
      return <ArtistPage state={state} setState={setState} />
    } else if (page === 2) {
      return <VenuePage state={state} setState={setState} />
    }
  }

  return (
    <div className="App">
      <div className="nav-wrapper">
        {pages.map((currPage, index) => {
          return (
            <p className={index === page ? 'active': ''} onClick={() => setPage(index)}>{currPage}</p>
          );
        })}
      </div>
      {renderPage()}
    </div>
  );
}

let EVENT_ID = 10000;

export class Event {
  id: number;
  date: Date;
  venue: Venue;
  artists: Array<Artist>;
  name: string;
  rating: number;

  constructor(name: string, date: Date, venue: Venue, rating: number) {
    this.name = name;
    this.date = date;
    this.venue = venue;
    this.artists = new Array<Artist>();
    this.rating = rating;
    this.id = EVENT_ID++;
  }
}

let ARTIST_ID = 1000;

export class Artist {
  name: string;
  id: number;
  numShows: number;

  constructor(name: string) {
    this.name = name;
    this.id = ARTIST_ID++;
    this.numShows = 1;
  }
}

let VENUE_ID = 100;

export class Venue {
  name: string;
  id: number;
  city: string;
  numShows: number;

  constructor(name: string, city: string) {
    this.name = name;
    this.city = city;
    this.id = VENUE_ID++;
    this.numShows = 1;
  }
}

