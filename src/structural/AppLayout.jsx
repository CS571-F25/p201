import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
function AppLayout(props) {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/p201">SplashScreen</Nav.Link>
                        <Nav.Link as={Link} to="/p201/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/p201/library">Library</Nav.Link>
                        <Nav.Link as={Link} to="/p201/bookshelf">Bookshelf</Nav.Link>
                        <Nav.Link as={Link} to="/p201/userprofile">Profile</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default AppLayout;