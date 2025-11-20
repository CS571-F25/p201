import { Card, Button } from "react-bootstrap";
function BookReview(props) {
    // lets say props are user, time, title, and content

    return <div>
        <Card>
            <h1>This book SUCKS</h1>
            <h2>by random User</h2>
            <p>
                not even useful as tinder!
            </p>
            <Button onClick={() => alert("someone should make a like function for this....")}>Like</Button>
            <Button onClick={() => alert("someone should make a DISLIKE function for this....")}>Dislike</Button>
        </Card>

    </div>
}

export default BookReview