import { Button } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the icon font CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext, useState } from "react";
import CurrentRatingContext from "../../contexts/CurrentRatingContext";

function StarRating(props) {
    //TODO
    // i think if we add users profiles and their favorites and their preferences we can lowkey call it a day
    // add replying to reviews
    // we need to make if the current rating is equal to or greater than index, the stars are filled in
    const [hover, setHover] = useState(0);

    const [userRating, setUserRating] = useContext(CurrentRatingContext)


    return (<div className="star-rating">
        {[...Array(props.count)].map((star, index) => {
            index += 1;
            return (
                <Button
                variant={index <= userRating ? "warning" : "secondary"}
                    key={index}
                    className={index <= (hover || userRating) ? "on" : "off"}
                    onClick={() => setUserRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(userRating)}
                >
                    <i  className={ index <= userRating ? "bi bi-star-fill": "bi bi-star"}></i>                 
                    </Button>
            );
        })}
    </div>)
}

export default StarRating