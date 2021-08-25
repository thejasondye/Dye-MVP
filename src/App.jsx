/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import MusicList from './components/MusicList.jsx';
import MusicDisplay from './components/MusicDisplay.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';
import axios from 'axios';

const App = (props) => {

  const [musicList, setMusitList] = useState(['music list item 1', 'music list item 2', 'music list item 3']);
  const [currentMusic, setCurrentMusic] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/excerpts/Equinox')
      .then((res) => {
        setCurrentMusic(res.data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`ERROR GETTING EXCERPT: ${err}`);
      })
  }, []);

  if (isLoading) {
    return <h3> Loading ... </h3>;
  } else {
    console.log(currentMusic.url);
    return (
      <Container>

        <Row>
          <h1>Schlagzeug!</h1>
        </Row>
        <Row style={{justifyContent: "right"}}>
          Hello, User!
        </Row>

        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Schlagzeug!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Paths</Nav.Link>
                <NavDropdown title="Resources" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Funky Fundamentals</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">How to use Schlagzeug!</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Message Your Teacher</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Row>
          <Col sm={3}>
            <MusicList musicList={musicList} />
          </Col>
          <Col sm={9}>
            <Row>
              <MusicDisplay currentMusic={currentMusic} />
            </Row>
            <Row>
              <AudioPlayer recordings={currentMusic.recordings} />
            </Row>
          </Col>
        </Row>

        <Row>
          <Col sm={4} className="d-grid">
            <Button>
              Previous
            </Button>
          </Col>
          <Col sm={4}>Placeholder!</Col>
          <Col sm={4} className="d-grid">
            <Button>
              Next
            </Button>
          </Col>
        </Row>

      </Container>
    );
  }

};

export default App;