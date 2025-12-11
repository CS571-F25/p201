import { Card, Button } from "react-bootstrap";
function BookReview(props) {
    // lets say props are user, time, title, and content

    return <div>
        <Card>
            <h1>{props.title}</h1>
            <h2>{`Rating: ${props.rating}`}</h2>
            <h4>{`By ${props.user} on ${new Date(props.publishDate).toLocaleString()}`}</h4>
            <p>
                {props.content}
            </p>
            <Button onClick={() => alert("someone should make a like function for this....")}>Like</Button>
            <Button onClick={() => alert("someone should make a DISLIKE function for this....")}>Dislike</Button>
        </Card>

    </div>
}

export default BookReview