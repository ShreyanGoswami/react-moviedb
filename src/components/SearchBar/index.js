import React, {useState, useEffect, useRef} from "react";
//Image
import searchIcon from '../../images/search-icon.svg'
//Styles
import {Wrapper, Content} from './SearchBar.styles'

const SearchBar = ({setSearchTerm}) => {
    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect(() => {
        // This will prevent the main logic from running on first load as we want to search only when someone types
        if (initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500);

        return () => clearTimeout(timer);
    }, [setSearchTerm, state])

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon' />
                {/* controlled component, react reads and sets the value of the component */}
                <input type='text' placeholder='Search movie' onChange={e => setState(e.currentTarget.value)} value={state}/> 
            </Content>
        </Wrapper>
    )
};

export default SearchBar;