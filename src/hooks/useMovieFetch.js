import { useState, useEffect } from "react";
import API from '../API';
import { isPersistedState } from "../helpers";

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // if this function is defined outside the useEffect it will cause an infinite loop
        // to define the function outside useEffect wrap the function declaration with useCallback hook
        const fetchMovie = async () => { 
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);

                // Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                })

                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);
        if (sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchMovie(); // Dont' forget to call the method!
    }, [movieId])

    // Write to session storage
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state)); // You can only write strings to storage
    },[movieId, state])


    return {state, loading, error};
}