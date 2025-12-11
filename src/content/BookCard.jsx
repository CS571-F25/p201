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

    }

    function unfavoriteBook() {
        setBookLanes(oldLanes => {
            let favoriteLane = oldLanes["favorites"]
            oldLanes["favorites"] = favoriteLane.filter(r => r != props.title)
            const newLanes = { ...oldLanes }
            return newLanes
        })
    }

    function storeFavoritesOnUser(){
        
    }
    //TO-DO 
    //      
    // 
    // 
    // 


    return (

        <Card style={{ width: '18rem', margin: '20px' }}>
            <Link to={`/p201/bookprofile?bookname=${props.name}`}>
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
            {bookLanes.isLoggedIn ? bookLanes.favorites.some(r => r === props.name) ? <Button onClick={unfavoriteBook} variant="danger">Remove from Bookshelf</Button> : <Button onClick={favoriteBook}>Add to Bookshelf</Button> : <></>}
        </Card>

    )
}


export default BookCard;