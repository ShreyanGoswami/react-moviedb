import React from "react";
import { Link } from "react-router-dom";

import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoIImg } from "./Header.styles";

const Header = () => (
    <Wrapper>
        <Content>
            <Link to='/'>
            <LogoImg src={RMDBLogo} alt='rmdb-logo'/>
            </Link>
            <TMDBLogoIImg src={TMDBLogo} alt='tmdb-logo' />
        </Content>
    </Wrapper>
)

export default Header;