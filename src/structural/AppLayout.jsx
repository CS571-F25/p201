import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
function AppLayout(props) {
    const [loginStatus, setLoginStatus] = useState(undefined)
    console.log(sessionStorage.getItem('loggedIn?'))
    console.log(loginStatus)
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default AppLayout;