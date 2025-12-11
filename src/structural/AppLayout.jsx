import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import { useState } from "react";
import FavoriteBooksContext from "../contexts/FavoriteBooksContext";
function AppLayout(props) {
    const [bookLanes, setBookLanes] = useState({
        favorites: []
    })

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/p201">SplashScreen</Nav.Link>
                        <Nav.Link as={Link} to="/p201/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/p201/catalog">Catalog</Nav.Link>
                        <Nav.Link as={Link} to="/p201/bookshelf">Bookshelf</Nav.Link>
                        <Nav.Link as={Link} to="/p201/userprofile">Profile</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
            <FavoriteBooksContext.Provider value ={[bookLanes, setBookLanes]}>
                <Outlet />
            </FavoriteBooksContext.Provider>
        </div>
    );
}

export default AppLayout;