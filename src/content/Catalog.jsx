import BookCard from "./BookCard";
import { Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import DataContextProvider from "../contexts/DataContextProvider";
function Catalog(props) {
    const [bookLanes, setBookLanes] = useContext(DataContextProvider)
    const [books, setBooks] = useState([])
    // add filtering by tag
    // we'll need api, get some project gutenberg books in here
    useEffect(() => {fetchBooks()}, [])
    
async function fetchBooks() {
    const apiBooks = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/books", {
        headers: {
            "X-CS571-ID": CS571.getBadgerId()
        }
    }).then(res => res.json()).then(res => Object.values(res.results))
    console.log(apiBooks)
    setBooks(apiBooks)
}

return (
    <div>
        <Row xs={1} sm={2} md={3} lg={4}>
            {books.map(r => <BookCard key={crypto.randomUUID()} title={r.title} name={r.title} author={r.author ? r.author : "unknown"}></BookCard>)}
        </Row>
        <p>

        </p>
    </div>
)
}

export default Catalog;