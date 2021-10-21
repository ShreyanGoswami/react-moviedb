// All custom hooks should start with use
import { useEffect, useState, useRef } from "react";

//API
import API from '../API';

//Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
} // Good for resetting

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState); // ES6 destructuring
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results] // Array with old movies and new movies
            }))
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };
    //Render and search
    useEffect(() => {
        // return from session storage
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');
            if (sessionState) {
                setState(sessionState)
                return;
            }
        }

        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]) // the useEffect will trigger whenever the dependency changes i.e when user inputs something on the search box

    //Load More
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page])

    // Write to session storage
    useEffect(() => {
        if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
    }, [searchTerm, state])

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};
}