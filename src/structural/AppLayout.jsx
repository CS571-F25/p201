import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
function AppLayout(props) {

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">SplashScreen</Nav.Link>
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/library">Library</Nav.Link>
                        <Nav.Link as={Link} to="/bookshelf">Bookshelf</Nav.Link>
                        <Nav.Link as={Link} to="/userprofile">Profile</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default AppLayout;