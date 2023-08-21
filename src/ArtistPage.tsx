import { useState, useEffect } from 'react';
import { AppState, Artist } from './App';

interface ArtistPageProps {
    state: AppState;
    setState: (value: Partial<AppState> | ((prevVar: AppState) => AppState)) => void;
}

type SortOptions = "Name A-Z" | "Most Shows" | "Most Recent";

function ArtistPage({ state, setState }: ArtistPageProps) {
    const [sort, setSort] = useState<SortOptions>("Most Recent");

    useEffect(() => {
        let compareFn;
        if (sort === "Name A-Z") {
            compareFn = (a: Artist, b: Artist) => a.name.localeCompare(b.name);
        } else if (sort === "Most Shows") {
            compareFn = (a: Artist, b: Artist) => b.numShows - a.numShows;
        } else if (sort === "Most Recent") {
            compareFn = (a: Artist, b: Artist) => b.latestDate.getTime() - a.latestDate.getTime();
        }
        setState({artists: [...state.artists].sort(compareFn)});
    }, [sort]);

    return (
        <div className="artists-wrapper">
            <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOptions)}
            >
                <option value="Most Recent">Most Recent</option>
                <option value="Name A-Z">Name A-Z</option>
                <option value="Most Shows">Most Shows</option>
            </select>
            {state.artists.map((artist, index) => <p key={index}>{`${artist.name} (${artist.numShows})`}</p>)}
        </div>
    );
}

export default ArtistPage;
