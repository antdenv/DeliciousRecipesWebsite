import Home from "./Home";
import Cuisine from './Cuisine';
import Searched from "./Searched";
import Recipe from './Recipe';
import Category from "../components/Category";
import Search from "../components/Search";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import styled from 'styled-components';
import {GiKnifeFork} from 'react-icons/gi';

function Pages() {
    return (
        <Router>
            <Nav>
                <GiKnifeFork/>
                <Logo to={'/'}>Delicious</Logo>
            </Nav>
            <Search/>
            <Category/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/cuisine/:type' element={<Cuisine/>}/>
                <Route path='/searched/:search' element={<Searched/>}/>
                <Route path='/recipe/:name' element={<Recipe/>}/>
            </Routes>
        </Router>
    );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  margin-left: 0.3rem;
`;

const Nav = styled.div`
  padding: 2rem 0rem 0rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

export default Pages;