import BookCard from "./BookCard";
import { Row } from "react-bootstrap";
function Library(props) {
    return (
        <div>
            <Row xs={1} sm={2} md={3} lg={4}>
                <BookCard title={"Library Card"} name={"LibraryCard"}></BookCard>
                <BookCard title={"Library Card"} name={"LibraryCard"}></BookCard>
                <BookCard title={"Library Card"} name={"LibraryCard"}></BookCard>
                <BookCard title={"Library Card"} name={"LibraryCard"}></BookCard>
            </Row>
            <p>

            </p>
        </div>
    )
}

export default Library;