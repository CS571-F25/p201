import { useEffect, useState } from "react"
import { Card, Row, Col } from "react-bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the icon font CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import BookCard from "./BookCard";
function UserProfile(props) {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('user')
    const [curUser, setCurUser] = useState()
    const [favoriteBooks, setFavoriteBooks] = useState()
    const [readBooks, setReadBooks] = useState()
    useEffect(() => {
        fetchCurrentProfile()
    }, [])

    async function fetchCurrentProfile() {

        console.log(page)
        const receivedUser = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/users", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(res => Object.values(res.results)).then(res => res.find(r => r.username === page))
        console.log(receivedUser)
        setCurUser(receivedUser)
        fetchBooks(receivedUser)
    }





    async function fetchBooks(profile) {
        const apiBooks = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/books", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(res => Object.values(res.results))
        setFavoriteBooks(apiBooks.filter(r => profile?.favorites.includes(r.title)))
        setReadBooks(apiBooks.filter(r=> profile?.readBooks.includes(r.title)))
    }











    return <Row className="g-4 h-100">
        <Col sm={12} md={6} lg={4} xl={3}>
            <Row>
                <Card className="h-100">
                    <h1>
                        {curUser?.username}
                    </h1>
                    <i class="bi bi-person-square" style={{ fontSize: 300 }}></i>
                </Card>
                <Card>
                    <Card.Title>Reputation</Card.Title>
                    <Card.Body style={{ fontSize: 24, fontStyle: 'oblique' }}>{curUser?.reputation == 0 ? `Born Neutral (${curUser?.reputation})` : curUser?.reputation < 0 ? `Scallywag (${curUser?.reputation})` : `Hero (${curUser?.reputation})`}</Card.Body>
                </Card>
                <Card>
                    <Card.Title>
                        Books Read
                    </Card.Title>
                    <p style={{fontWeight: "bold", fontSize: 25}}>{readBooks?.length}</p>
                </Card>
            </Row>
        </Col>
        <Col xl={9}>
            <Row>
                <Card>
                    <h2>Favorite Books</h2>
                    <Row>
                        {favoriteBooks?.map(r => <BookCard key={crypto.randomUUID()}{...r}></BookCard>)}
                    </Row>
                </Card>
                <Card>
                    <h2>Books I've read</h2>
                     {readBooks?.map(r => <BookCard key={crypto.randomUUID()}{...r}></BookCard>)}
                </Card>
            </Row>
        </Col>
    </Row>

}
export default UserProfile;