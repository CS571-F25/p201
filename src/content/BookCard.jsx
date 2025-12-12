import { Card, CardBody } from "react-bootstrap";
import reactlogo from "../assets/react.svg"
import { Link } from "react-router";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import DataContextProvider from "../contexts/DataContextProvider";
function BookCard(props) {
    const [bookLanes, setBookLanes] = useContext(DataContextProvider)

    function favoriteBook() {
        setBookLanes(oldLanes => {
            let favoriteLane = oldLanes["favorites"]
            const newLanes = { ...oldLanes }
            newLanes["favorites"] = [...favoriteLane, props.title]
            return newLanes
        })
        storeFavoritesOnUser()

    }

    function readBook() {
        setBookLanes(oldLanes => {
            let favoriteLane = oldLanes["readBooks"]
            const newLanes = { ...oldLanes }
            newLanes["readBooks"] = [...favoriteLane, props.title]
            return newLanes
        })
        storeReadBooksOnUser()
    }

    async function storeReadBooksOnUser() {
        const curUser = await whoAmI()
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/users?id=${curUser[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: curUser[1].username,
                password: curUser[1].password,
                reputation: curUser[1].reputation,
                favorites: [...bookLanes.favorites],
                readBooks: [...bookLanes.readBooks, props.title]
            })
        })
    }
    function unfavoriteBook() {
        setBookLanes(oldLanes => {
            let favoriteLane = oldLanes["favorites"]
            oldLanes["favorites"] = favoriteLane.filter(r => r != props.title)
            const newLanes = { ...oldLanes }
            return newLanes
        })
        removeFavoritesOnUser()
    }
    function unreadBook() {
        setBookLanes(oldLanes => {
            let favoriteLane = oldLanes["readBooks"]
            oldLanes["readBooks"] = favoriteLane.filter(r => r != props.title)
            const newLanes = { ...oldLanes }
            return newLanes
        })
        removeReadBooksOnUser()
    }
    async function whoAmI() {
        const IamThisGuy = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/users", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        }).then(res => res.json()).then(res => Object.entries(res.results)).then(res => res.find(r => r[1]["username"] === bookLanes.curUser))
        return IamThisGuy
    }

    async function storeFavoritesOnUser() {
        const curUser = await whoAmI()
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/users?id=${curUser[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: curUser[1].username,
                password: curUser[1].password,
                reputation: curUser[1].reputation,
                favorites: [...bookLanes.favorites, props.title],
                readBooks: bookLanes.readBooks

            })
        })
    }

    async function removeFavoritesOnUser() {
        const curUser = await whoAmI()
        const favoriteLane = bookLanes.favorites.filter(r => r != props.title)

        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/users?id=${curUser[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: curUser[1].username,
                password: curUser[1].password,
                reputation: curUser[1].reputation,
                favorites: favoriteLane,
                readBooks: bookLanes.readBooks
            })
        })
    }

    async function removeReadBooksOnUser() {
        const curUser = await whoAmI()
        const filteredReadBooks = bookLanes.readBooks.filter(r => r != props.title)

        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/users?id=${curUser[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: curUser[1].username,
                password: curUser[1].password,
                reputation: curUser[1].reputation,
                favorites: [...bookLanes.favorites],
                readBooks: filteredReadBooks
            })
        })
    }
    //TO-DO 
    //      
    // 
    // 
    // 


    return (

        <Card style={{ width: '18rem', margin: '20px' }}>
            <Link to={`/p201/bookprofile?bookname=${props.title}`}>
                <Card.Body>
                    <Card.Img variant="top" src={reactlogo} />
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.author}
                    </Card.Text>
                    <Card.Text>
                        What if we had some actual books that would be funny i think
                    </Card.Text>

                </Card.Body>
            </Link>
            <div>
                {bookLanes.isLoggedIn ? bookLanes.favorites.some(r => r === props.title) ? <Button onClick={unfavoriteBook} variant="danger">Remove from Bookshelf</Button> : <Button onClick={favoriteBook}>Add to Bookshelf</Button> : <></>}
                {bookLanes.isLoggedIn ? bookLanes.readBooks.some(r => r === props.title) ? <Button onClick={unreadBook} variant="secondary">I've not read this book!</Button> : <Button onClick={readBook} variant="success">I've read this book!</Button> : <></>}
            </div>
        </Card>

    )
}


export default BookCard;