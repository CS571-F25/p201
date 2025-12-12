import BookCard from "./BookCard"
import DataContextProvider from "../contexts/DataContextProvider"
import { use, useContext } from "react"
import { Button } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Link } from "react-router"
function BookShelf(props) {
    const [bookLanes, setBookLanes] = useContext(DataContextProvider)
    return <div>
        <Row>
            {bookLanes.favorites.length != 0 ? bookLanes.favorites.map(r => <BookCard key={crypto.randomUUID} title={r} name={r}></BookCard>) : bookLanes.isLoggedIn ? <p>you should really get some books here</p> : <div style={{fontSize: 40, fontWeight: "bolder"}}>
            <p>And if you had an account right now...</p>
            <p>Then maybe, here too, you would see some....</p>
            <p>Favorite books of yours, that you are intending to read...</p>
            <p>Or that you have already ready...</p>

            <Link to={"/p201/signup"}>
            <p>Considering Signing Up?</p>
            </Link>


        </div>}
        </Row>
    </div>
}

export default BookShelf