import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import { useState } from "react";
import DataContextProvider from "../contexts/DataContextProvider";
function AppLayout(props) {
    const [websiteData, setWebsiteData] = useState({
        favorites: [],
        isLoggedIn: false,
        curUser : "guest",
        reputation : null
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
                        {websiteData.isLoggedIn ? <Nav.Link as={Link} to="/p201/logout">Logout</Nav.Link> : <Nav.Link as={Link} to="/p201/signup">Signup & Login</Nav.Link>}
                    </Nav>
                </Container>
                <h1 style={{color: "white", fontSize: 24}}>{websiteData.isLoggedIn ? `${websiteData.curUser}` : "Currently in guest mode"}</h1>
            </Navbar>
            <DataContextProvider.Provider value={[websiteData, setWebsiteData]}>
                <Outlet />
            </DataContextProvider.Provider>
        </div>
    );
}

export default AppLayout;