import { Row, Col, Button } from "react-bootstrap"
import BookCard from "./BookCard"
import BookReview from "./BookReview"

function BookProfile(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <Row>
                <Col xs={3}>
                    <BookCard title={"Book Profile"} name={"BookProfile"} >
                    </BookCard>
                    <Button onClick={() => {
                        alert("We have no data yet :(")
                    }}>READ</Button>
                </Col>
                <Col xs={9}>
                    <BookReview></BookReview>
                </Col>
            </Row>
            <p>
                it would be funny if there were some books here i think
            </p>
        </div>
    )
}

export default BookProfile
