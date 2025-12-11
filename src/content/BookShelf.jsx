import BookCard from "./BookCard"
import DataContextProvider from "../contexts/DataContextProvider"
import { use, useContext } from "react"
import { Button } from "react-bootstrap"
import { Row } from "react-bootstrap"
function BookShelf(props) {
    const [bookLanes, setBookLanes] = useContext(DataContextProvider)
    return <div>
        <Row>
            {bookLanes.favorites.length != 0 ? bookLanes.favorites.map(r => <BookCard key={crypto.randomUUID} title={r} name={r}></BookCard>) : <p>you should really get some books here</p>}
        </Row>
    </div>
}

export default BookShelf