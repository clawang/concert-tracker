import { useState, useEffect } from 'react';
import { AppState, Venue } from './App';

interface VenuePageProps {
    state: AppState;
    setState: (value: Partial<AppState> | ((prevVar: AppState) => AppState)) => void;
}

type SortOptions = "Name A-Z" | "City A-Z" | "Most Shows" | "Most Recent";

function VenuePage({ state, setState }: VenuePageProps) {
    const [sort, setSort] = useState<SortOptions>("Most Recent");

    useEffect(() => {
        let compareFn;
        if (sort === "Name A-Z") {
            compareFn = (a: Venue, b: Venue) => a.name.localeCompare(b.name);
        } else if (sort === "City A-Z") {
            compareFn = (a: Venue, b: Venue) => a.city.localeCompare(b.city);
        } else if (sort === "Most Shows") {
            compareFn = (a: Venue, b: Venue) => b.numShows - a.numShows;
        } else if (sort === "Most Recent") {
            compareFn = (a: Venue, b: Venue) => b.latestDate.getTime() - a.latestDate.getTime();
        }
        setState({venues: [...state.venues].sort(compareFn)});
    }, [sort]);

    return (
        <div className="venues-wrapper">
            <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOptions)}
            >
                <option value="Most Recent">Most Recent</option>
                <option value="Name A-Z">Name A-Z</option>
                <option value="City A-Z">City A-Z</option>
                <option value="Most Shows">Most Shows</option>
            </select>
            {state.venues.map((venue, index) => {
                return (
                    <div className="venue-wrapper" key={index}>
                        <p>
                            <span className="venue-name">{venue.name}</span>
                            <span className="venue-info">{venue.city} ({venue.numShows})</span>
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default VenuePage;
