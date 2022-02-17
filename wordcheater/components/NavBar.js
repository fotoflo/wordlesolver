import React from "react";


import styled from "styled-components";

import ThemeToggleSwitch from './ThemeToggleSwitch';
import {Navbar, Container} from 'react-bootstrap'

import { FaLightbulb, FaRegQuestionCircle } from 'react-icons/fa';


// import {FaSignOutAlt} from 'react-icons/fa'

function NavBar({ theme, modalToggler, hintToggler, themeToggler }) {





 

  return (
    <StyledNavbar variant={theme} className="justify-content-between">
      <Container>
        <Navbar.Brand onClick={modalToggler}>
          <FaRegQuestionCircle />
        </Navbar.Brand>
      </Container>
      <Container>
        <Navbar.Brand href="#home">WordCheater</Navbar.Brand>
      </Container>
      <Container className="justify-content-end">
        <ThemeToggleSwitch defaultValue={true} toggleFn={themeToggler} />
        <HintToggler onClick={hintToggler}>
          <FaLightbulb />
        </HintToggler>
      </Container>
    </StyledNavbar>
  );
}


const HintToggler = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const StyledNavbar = styled(Navbar)`
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  left: 50%;
  transform: translatex(-50%);
  width:80%;
  margin-bottom: 2rem;
`


export default NavBar;
