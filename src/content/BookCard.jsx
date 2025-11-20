import { Card, CardBody } from "react-bootstrap";
import reactlogo from "../assets/react.svg"
import { Link } from "react-router";
function BookCard(props) {

    //TO-DO 
    //      
    // 
    // 
    // 


    return (
        <Link to={`/bookprofile?=${props.name}`}>
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Img variant="top" src={reactlogo} />
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        What if we had some actual books that would be funny i think
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}


export default BookCard;