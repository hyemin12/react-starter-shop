import "./App.css";
import React, { useState, useContext } from "react";
import Data from "./data.js";
import Detail from "./components/Detail.js";
import Cart from "./components/Cart.js";
import Practice from "./components/Practice.js";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import axios from "axios";

import { Link, Route, Switch, useHistory } from "react-router-dom";

let stockContext = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [stock, stockChange] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Practice />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Shoe Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/" as={Link}>
                Home
              </Nav.Link>
              <Nav.Link to="/detail" as={Link}>
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className="jumbotron">
            <h1>20% Seanson OFf</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <a className="btn btn-primary" href="/" role="button">
              Learn more
            </a>
          </div>
          <div className="container">
            <stockContext.Provider value={stock}>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={a} i={i} key={i} />;
                })}
              </div>
            </stockContext.Provider>
            <button
              className="btn btn-primary"
              onClick={() => {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    shoes변경([...shoes, ...result.data]);
                    console.log(shoes);
                    console.log(result.data);
                  }) // 성공했을 떄
                  .catch(() => {
                    console.log("실패");
                  }); // 실패했을 때;
              }}
            >
              더보기
            </button>
          </div>
        </Route>
        <Route path="/detail/:id" component={Detail}>
          <Detail shoes={shoes} stock={stock} stockChange={stockChange} />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/:id">
          <div>오류! 없는 페이지입니다.</div>
        </Route>
      </Switch>
    </div>
  );

  function Card(props) {
    let stock = useContext(stockContext);
    let history = useHistory();
    return (
      <div
        className="col-md-4"
        onClick={() => {
          history.push("/detail/ " + props.shoes.id);
        }}
      >
        <img
          src={
            "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
          }
          alt="신발이미지"
          width="100%"
        />
        <h4>{props.shoes.title}</h4>
        <p>
          {props.shoes.content} & {props.shoes.price}
        </p>
        {stock[props.i]}
      </div>
    );
  }
}

export default App;
